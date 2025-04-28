/**
 * HabitVerse X - Particles Animation
 * Creates a futuristic particle network background effect
 */

document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;

    // Configuration
    const config = {
        particleCount: 100,
        connectionDistance: 150,
        moveSpeed: 0.5,
        lineOpacity: 0.15,
        particleColor: '#ffffff',
        lineColor: '#ffffff',
        particleSizeMin: 1,
        particleSizeMax: 3,
        responsive: true
    };

    // Canvas setup
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    particleContainer.appendChild(canvas);

    // Make canvas full screen and handle resizing
    function setCanvasSize() {
        canvas.width = particleContainer.offsetWidth;
        canvas.height = particleContainer.offsetHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * config.moveSpeed;
            this.vy = (Math.random() - 0.5) * config.moveSpeed;
            this.size = config.particleSizeMin + Math.random() * (config.particleSizeMax - config.particleSizeMin);
        }

        update() {
            // Move particle
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) {
                this.vx = -this.vx;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.vy = -this.vy;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = config.particleColor;
            ctx.fill();
        }
    }

    // Create particles
    let particles = [];

    function createParticles() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Draw connections between particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    // Calculate opacity based on distance
                    const opacity = 1 - (distance / config.connectionDistance);
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * config.lineOpacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        drawConnections();

        // Request next frame
        requestAnimationFrame(animate);
    }

    // Handle mouse interaction (optional)
    let mouseParticle = null;
    
    canvas.addEventListener('mousemove', (e) => {
        if (!mouseParticle) {
            mouseParticle = new Particle();
            mouseParticle.size = 0; // Make invisible
        }
        
        const rect = canvas.getBoundingClientRect();
        mouseParticle.x = e.clientX - rect.left;
        mouseParticle.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouseParticle = null;
    });

    // Start animation
    createParticles();
    animate();
}); 