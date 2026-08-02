'use client';

import { useEffect, useRef, useState } from 'react';

export default function AmbientShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexSource = `
      attribute vec2 position;
      varying vec2 v_texCoord;
      void main() {
          v_texCoord = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / u_resolution;
          
          float noise = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 2.0 - u_time * 0.3);
          float glow = 1.0 - distance(uv, mouse);
          glow = pow(max(0.0, glow), 4.0) * 0.25;
          
          vec3 color1 = vec3(0.97, 0.98, 0.99); 
          vec3 color2 = vec3(0.92, 0.94, 0.97); 
          vec3 accent = vec3(0.0, 0.32, 0.83); 
          
          vec3 finalColor = mix(color1, color2, uv.y + noise * 0.08);
          finalColor = mix(finalColor, accent, glow);
          
          gl_FragColor = vec4(finalColor, 0.12); 
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    let mX = 0,
      mY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mX = e.clientX;
      mY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    function resize() {
      if (!canvas || !gl) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    let animId: number;
    function render(time: number) {
      if (!canvas || !gl || !program) return;
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mX, canvas.height - mY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return <canvas id="ambient-shader" ref={canvasRef} />;
}
