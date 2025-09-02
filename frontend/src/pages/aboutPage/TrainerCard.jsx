export default function TrainerCard() {
  const trainers = [
    {
      src: "trainer/ajay.png",
      name: "Ajay Singh Thakur",
      role: "Technical Trainer - MERN Stack & Java",
      desc: `Specialist in Java, Spring Boot, and backend development. Focused on strong programming foundations and practical projects.
      Also in MongoDB, Express, React, and Node.js. Passionate about building scalable web apps and guiding learners into full-stack development.`,
    },
    {
      src: "trainer/pawan.png",
      name: "Pawan Sahu",
      role: "Technical Trainer - MERN Stack & Java",
      desc: `Expert in MongoDB, Express, React, and Node.js. Passionate about building scalable web apps and guiding learners into full-stack development.

      Also in Java, Spring Boot, and backend development. Focused on strong programming foundations and practical projects.`,
    },
    {
      src: "trainer/sonia.png",
      name: "Sonia S Awasthi",
      role: "Soft Skills Trainer - English & Communication",
      desc: "Dedicated to improving communication, public speaking, and personality development for students.",
    },
    {
      src: "trainer/bj.png",
      name: "Capt B J (Bhupinder Singh) Singh",
      role: "Director",
      desc: "Leading with vision and commitment to empower students with technical excellence and holistic growth.",
    },
  ];

  return (
    <div className="space-y-10">
      {trainers.map((t, i) => (
        <div
          key={i}
          className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 text-gray-800 hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Left: Trainer Image */}
          <div className="flex-shrink-0 relative">
            <img
              src={t.src}
              alt={t.name}
              className="w-40 h-40 md:w-56 md:h-56 rounded-2xl object-cover shadow-md border-4 border-gray-100"
            />
            {/* Decorative Quote */}
            <div className="absolute -top-6 -left-6 text-7xl md:text-8xl text-red-200 font-serif select-none">
              “
            </div>
          </div>

          {/* Right: Trainer Info */}
          <div className="text-center md:text-left max-w-2xl">
            <span className="text-sm uppercase tracking-widest text-red-600 font-semibold">
              {i === trainers.length - 1 ? "Our Director" : "Meet Our Trainer"}
            </span>

            <h3 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
              {t.name}
            </h3>

            <p className="text-sm text-gray-500 pt-2 mb-4">{t.role}</p>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              {t.desc}
            </p>

            <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-red-400 mb-6 rounded-full mx-auto md:mx-0"></div>

            <p className="text-sm md:text-base text-gray-600">
              Helping students grow with the right guidance and mentorship. 🚀
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
