import { useRef, useEffect } from "react";

const ParticleImage = ({
  picture,
  width,
  height,
  repelSpeed,
  repelRadius,
  reJoinSpeed,
  density,
}: {
  picture: any;
  width: number;
  height: number;
  repelSpeed: number;
  repelRadius: number;
  reJoinSpeed: number;
  density: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let particles: any[] = [];

      const handleMouseMove = (event: any) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        particles.forEach((particle) => {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx ** 2 + dy ** 2);

          if (distance < repelRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (repelRadius - distance) / repelRadius;
            const moveX = Math.cos(angle) * force * repelSpeed;
            const moveY = Math.sin(angle) * force * repelSpeed;
            particle.x += moveX;
            particle.y += moveY;
          } else {
            particle.x -= (particle.x - particle.originalX) * reJoinSpeed;
            particle.y -= (particle.y - particle.originalY) * reJoinSpeed;
          }
        });
      };

      const handleResize = () => {
        canvas.width = width;
        canvas.height = height;
      };

      const loadImage = () => {
        const image = new Image();
        image.src = picture; // Replace with your image URL

        image.onload = () => {
          if (ctx) {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const data = imageData.data;

            for (let y = 0; y < canvas.height; y += 4) {
              for (let x = 0; x < canvas.width; x += 4) {
                const index = (x + y * canvas.width) * 4;

                if (data[index + 3] > 0) {
                  const particle = {
                    x: x,
                    y: y,
                    originalX: x,
                    originalY: y,
                    color: `rgba(${data[index]}, ${data[index + 1]}, ${
                      data[index + 2]
                    }, ${data[index + 3]})`,
                  };

                  particles.push(particle);
                }
              }
            }
          }
        };
      };

      const animate = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, density / 2, 0, 2 * Math.PI);
            ctx.fillStyle = particle.color;
            ctx.fill();
          });
        }

        requestAnimationFrame(animate);
      };

      handleResize();
      loadImage();
      animate();

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
};

export default ParticleImage;
