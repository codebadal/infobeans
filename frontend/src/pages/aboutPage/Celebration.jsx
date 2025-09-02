export default function Celebration() {
  const events = [
    {
      title: "Diwali Celebration",
      desc: "We celebrated the festival of lights with diyas, rangoli, and cultural performances. The event brought joy, unity, and festive spirit among all students and faculty.",
      img: "events/diwali.png",
    },
    {
      title: "Christmas Celebration",
      desc: "Christmas was celebrated with decorations, music, and fun activities. Santa Claus visited with gifts and students enjoyed cake cutting, games, and carol singing.",
      img: "events/christmas.png",
    },
    {
      title: "Krishna Janmashtami",
      desc: "The birth of Lord Krishna was celebrated with devotion, bhajans, and dahi-handi. Students participated with great enthusiasm, spreading positivity and togetherness.",
      img: "events/janmashtami.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdf7f2] p-10 space-y-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Celebrations & Festivals
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed">
        At our foundation, learning goes beyond classrooms. We are not just an institute — we are a family where each student feels a sense of belonging. We celebrate together, support one another, and create an environment full of care and positivity. Our aim is to nurture not only knowledge but also character, unity, and happiness.
        </p>

      {events.map((event, i) => (
        <div
          key={i}
          className={`flex flex-col md:flex-row items-center gap-10 ${
            i % 2 === 1 ? "md:flex-row-reverse" : ""
          } max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200`}
        >
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {event.title}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {event.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
