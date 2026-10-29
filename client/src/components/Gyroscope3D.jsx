import { useEffect, useRef } from "react";

/**
 * High-Performance Interactive 3D Gyroscope & Geodesic Orb
 * Matches the user's reference CAD / 3D AI platform interface.
 * Implements 3D rotation projection, depth-sorted rendering,
 * concentric metallic gimbal rings, slotted rotor fins, and smooth mouse tracking.
 */
export default function Gyroscope3D({ theme = "dark" }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 540;
    let height = 540;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      const rect = parent.getBoundingClientRect();
      const parentW = rect.width || parent.clientWidth || 540;
      const parentH = rect.height || parent.clientHeight || 540;
      width = Math.max(320, parentW);
      height = Math.max(320, parentH);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = Math.max(-1, Math.min(1, nx));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, ny));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 3D Math Helper Functions
    const rotatePoint = (x, y, z, rx, ry, rz) => {
      // Y-axis rotation
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y1 = y;

      // X-axis rotation
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;
      const x2 = x1;

      // Z-axis rotation
      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);
      const x3 = x2 * cosZ - y2 * sinZ;
      const y3 = x2 * sinZ + y2 * cosZ;
      const z3 = z2;

      return { x: x3, y: y3, z: z3 };
    };

    const project = (p, fov, cx, cy) => {
      const scale = fov / (fov + p.z);
      return {
        x: cx + p.x * scale,
        y: cy + p.y * scale,
        scale,
        z: p.z,
      };
    };

    // Precalculate Geodesic Sphere Coordinates
    const LATITUDE_COUNT = 9;
    const LONGITUDE_COUNT = 12;
    const SEGMENTS_PER_RING = 64;

    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth mouse lerp
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      const isLight = theme === "light";
      const cx = width / 2;
      const cy = height / 2;
      const fov = 650;
      const R = Math.min(width, height) * 0.44;

      ctx.clearRect(0, 0, width, height);

      // Rotation angles with subtle organic float + mouse tilt
      const rx = 0.28 + m.y * 0.45 + Math.sin(time * 0.3) * 0.04;
      const ry = time * 0.55 + m.x * 0.55;
      const rz = -0.15 + m.x * 0.2;

      // Light direction vector (normalized)
      const lx = -0.6;
      const ly = -0.7;
      const lz = 0.8;
      const lLen = Math.hypot(lx, ly, lz);
      const nlx = lx / lLen;
      const nly = ly / lLen;
      const nlz = lz / lLen;

      // 1. DRAW BACK-FACING SPHERE WIREFRAME (Latitude & Longitude)
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = isLight ? "rgba(100, 116, 139, 0.16)" : "rgba(226, 232, 240, 0.14)";

      // Latitudes
      for (let i = 1; i < LATITUDE_COUNT; i++) {
        const phi = (i / LATITUDE_COUNT) * Math.PI - Math.PI / 2;
        const yVal = R * Math.sin(phi);
        const rVal = R * Math.cos(phi);

        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= SEGMENTS_PER_RING; j++) {
          const theta = (j / SEGMENTS_PER_RING) * Math.PI * 2;
          const xVal = rVal * Math.cos(theta);
          const zVal = rVal * Math.sin(theta);
          const p = rotatePoint(xVal, yVal, zVal, rx, ry, rz);

          if (p.z < 0) {
            const pt = project(p, fov, cx, cy);
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Longitudes
      for (let i = 0; i < LONGITUDE_COUNT; i++) {
        const psi = (i / LONGITUDE_COUNT) * Math.PI;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= SEGMENTS_PER_RING; j++) {
          const theta = (j / SEGMENTS_PER_RING) * Math.PI * 2;
          const xVal = R * Math.cos(theta) * Math.cos(psi);
          const yVal = R * Math.sin(theta);
          const zVal = R * Math.cos(theta) * Math.sin(psi);
          const p = rotatePoint(xVal, yVal, zVal, rx, ry, rz);

          if (p.z < 0) {
            const pt = project(p, fov, cx, cy);
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 2. INNER SLOTTED ROTOR FINNED HUB (Back half)
      const hubR = R * 0.62;
      const hubH = R * 0.22;
      const finCount = 28;

      // Render rotor teeth/fins
      for (let i = 0; i < finCount; i++) {
        const finAngle = (i / finCount) * Math.PI * 2 + time * 0.4;
        const fx = hubR * Math.cos(finAngle);
        const fz = hubR * Math.sin(finAngle);

        const pBot = rotatePoint(fx, -hubH, fz, rx, ry, rz);
        const pTop = rotatePoint(fx, hubH, fz, rx, ry, rz);

        if (pBot.z < 0 && pTop.z < 0) {
          const ptB = project(pBot, fov, cx, cy);
          const ptT = project(pTop, fov, cx, cy);

          ctx.beginPath();
          ctx.strokeStyle = isLight ? "rgba(15, 23, 42, 0.15)" : "rgba(148, 163, 184, 0.2)";
          ctx.lineWidth = 1.2;
          ctx.moveTo(ptB.x, ptB.y);
          ctx.lineTo(ptT.x, ptT.y);
          ctx.stroke();
        }
      }

      // 3. CENTRAL SHADED METALLIC BALL / OBSIDIAN CORE
      const coreR = R * 0.32;
      const coreCenter = rotatePoint(0, 0, 0, rx, ry, rz);
      const corePt = project(coreCenter, fov, cx, cy);
      const rProjected = coreR * corePt.scale;

      const grad = ctx.createRadialGradient(
        corePt.x - rProjected * 0.35,
        corePt.y - rProjected * 0.35,
        rProjected * 0.05,
        corePt.x,
        corePt.y,
        rProjected
      );

      if (isLight) {
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.3, "#cbd5e1");
        grad.addColorStop(0.75, "#475569");
        grad.addColorStop(1, "#0f172a");
      } else {
        grad.addColorStop(0, "#cbd5e1");
        grad.addColorStop(0.2, "#64748b");
        grad.addColorStop(0.65, "#1e293b");
        grad.addColorStop(1, "#050811");
      }

      ctx.beginPath();
      ctx.arc(corePt.x, corePt.y, rProjected, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core rim edge glow
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isLight ? "rgba(2, 132, 199, 0.3)" : "rgba(56, 189, 248, 0.35)";
      ctx.stroke();

      // 4. INNER SLOTTED ROTOR FINNED HUB (Front half)
      for (let i = 0; i < finCount; i++) {
        const finAngle = (i / finCount) * Math.PI * 2 + time * 0.4;
        const fx = hubR * Math.cos(finAngle);
        const fz = hubR * Math.sin(finAngle);

        const pBot = rotatePoint(fx, -hubH, fz, rx, ry, rz);
        const pTop = rotatePoint(fx, hubH, fz, rx, ry, rz);

        if (pBot.z >= 0 || pTop.z >= 0) {
          const ptB = project(pBot, fov, cx, cy);
          const ptT = project(pTop, fov, cx, cy);

          // Specular highlight on front fins
          const normalDot = Math.cos(finAngle + ry);
          const alpha = Math.max(0.2, Math.min(0.9, normalDot * 0.6 + 0.4));

          ctx.beginPath();
          ctx.strokeStyle = isLight
            ? `rgba(15, 23, 42, ${alpha})`
            : `rgba(226, 232, 240, ${alpha})`;
          ctx.lineWidth = 2.2;
          ctx.moveTo(ptB.x, ptB.y);
          ctx.lineTo(ptT.x, ptT.y);
          ctx.stroke();
        }
      }

      // 5. OUTER METALLIC TITANIUM GIMBAL RING (Beveled Torus)
      // Tilted orbital plane for dynamic gyroscope look
      const ringTiltX = 0.45;
      const ringTiltZ = 0.3;
      const ringR = R * 0.95;
      const ringThickness = R * 0.08;
      const ringSegments = 80;

      // Draw thick metallic beveled ring
      const ringSteps = [
        { r: ringR + ringThickness, y: -ringThickness * 0.35, shade: 0.9 },
        { r: ringR + ringThickness * 0.5, y: -ringThickness * 0.5, shade: 1.0 },
        { r: ringR - ringThickness * 0.5, y: ringThickness * 0.5, shade: 0.6 },
        { r: ringR - ringThickness, y: ringThickness * 0.35, shade: 0.4 },
      ];

      for (let s = 0; s < ringSteps.length - 1; s++) {
        const r1 = ringSteps[s].r;
        const y1 = ringSteps[s].y;
        const r2 = ringSteps[s + 1].r;
        const y2 = ringSteps[s + 1].y;

        for (let i = 0; i < ringSegments; i++) {
          const a1 = (i / ringSegments) * Math.PI * 2;
          const a2 = ((i + 1) / ringSegments) * Math.PI * 2;

          // Local ring coords with inclined orbital tilt
          const p1 = rotatePoint(r1 * Math.cos(a1), y1, r1 * Math.sin(a1), ringTiltX, 0, ringTiltZ);
          const p2 = rotatePoint(r1 * Math.cos(a2), y1, r1 * Math.sin(a2), ringTiltX, 0, ringTiltZ);
          const p3 = rotatePoint(r2 * Math.cos(a2), y2, r2 * Math.sin(a2), ringTiltX, 0, ringTiltZ);
          const p4 = rotatePoint(r2 * Math.cos(a1), y2, r2 * Math.sin(a1), ringTiltX, 0, ringTiltZ);

          // World rotation
          const wp1 = rotatePoint(p1.x, p1.y, p1.z, rx, ry * 0.8, rz);
          const wp2 = rotatePoint(p2.x, p2.y, p2.z, rx, ry * 0.8, rz);
          const wp3 = rotatePoint(p3.x, p3.y, p3.z, rx, ry * 0.8, rz);
          const wp4 = rotatePoint(p4.x, p4.y, p4.z, rx, ry * 0.8, rz);

          // Normal estimation for lighting
          const avgZ = (wp1.z + wp2.z + wp3.z + wp4.z) / 4;
          const midX = (wp1.x + wp2.x) / 2;
          const midY = (wp1.y + wp2.y) / 2;
          const lightFactor = Math.max(0.1, (midX * nlx + midY * nly) / ringR + 0.55);

          const pt1 = project(wp1, fov, cx, cy);
          const pt2 = project(wp2, fov, cx, cy);
          const pt3 = project(wp3, fov, cx, cy);
          const pt4 = project(wp4, fov, cx, cy);

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.lineTo(pt3.x, pt3.y);
          ctx.lineTo(pt4.x, pt4.y);
          ctx.closePath();

          if (isLight) {
            const v = Math.floor(180 * lightFactor + 40);
            ctx.fillStyle = `rgba(${v}, ${v + 5}, ${v + 15}, ${avgZ > 0 ? 0.95 : 0.6})`;
          } else {
            const v = Math.floor(210 * lightFactor + 30);
            ctx.fillStyle = `rgba(${v}, ${v + 8}, ${v + 18}, ${avgZ > 0 ? 0.95 : 0.5})`;
          }
          ctx.fill();

          // Beveled chrome highlight edge
          ctx.strokeStyle = isLight
            ? `rgba(15, 23, 42, ${0.15 * lightFactor})`
            : `rgba(255, 255, 255, ${0.45 * lightFactor})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // 6. DRAW FRONT-FACING SPHERE WIREFRAME (Latitude & Longitude)
      ctx.lineWidth = 1.15;
      ctx.strokeStyle = isLight ? "rgba(15, 23, 42, 0.45)" : "rgba(241, 245, 249, 0.55)";

      // Front Latitudes
      for (let i = 1; i < LATITUDE_COUNT; i++) {
        const phi = (i / LATITUDE_COUNT) * Math.PI - Math.PI / 2;
        const yVal = R * Math.sin(phi);
        const rVal = R * Math.cos(phi);

        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= SEGMENTS_PER_RING; j++) {
          const theta = (j / SEGMENTS_PER_RING) * Math.PI * 2;
          const xVal = rVal * Math.cos(theta);
          const zVal = rVal * Math.sin(theta);
          const p = rotatePoint(xVal, yVal, zVal, rx, ry, rz);

          if (p.z >= 0) {
            const pt = project(p, fov, cx, cy);
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Front Longitudes
      for (let i = 0; i < LONGITUDE_COUNT; i++) {
        const psi = (i / LONGITUDE_COUNT) * Math.PI;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= SEGMENTS_PER_RING; j++) {
          const theta = (j / SEGMENTS_PER_RING) * Math.PI * 2;
          const xVal = R * Math.cos(theta) * Math.cos(psi);
          const yVal = R * Math.sin(theta);
          const zVal = R * Math.cos(theta) * Math.sin(psi);
          const p = rotatePoint(xVal, yVal, zVal, rx, ry, rz);

          if (p.z >= 0) {
            const pt = project(p, fov, cx, cy);
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Front Intersecting Node Points (Glowing dots at geodesic crossings)
      ctx.fillStyle = isLight ? "#0284c7" : "#38bdf8";
      for (let i = 2; i < LATITUDE_COUNT - 1; i += 2) {
        const phi = (i / LATITUDE_COUNT) * Math.PI - Math.PI / 2;
        const yVal = R * Math.sin(phi);
        const rVal = R * Math.cos(phi);

        for (let j = 0; j < LONGITUDE_COUNT; j += 2) {
          const theta = (j / LONGITUDE_COUNT) * Math.PI * 2;
          const xVal = rVal * Math.cos(theta);
          const zVal = rVal * Math.sin(theta);
          const p = rotatePoint(xVal, yVal, zVal, rx, ry, rz);

          if (p.z > R * 0.25) {
            const pt = project(p, fov, cx, cy);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2 * pt.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="gyroscope-3d-wrapper">
      <canvas ref={canvasRef} className="gyroscope-3d-canvas" />
    </div>
  );
}
