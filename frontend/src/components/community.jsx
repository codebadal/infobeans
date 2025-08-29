export default function CommunityInitiativesLight() {
  return (
    <div className="bg-[#fff8f0] py-12 px-6 md:px-16 space-y-16 text-gray-800">
      
      {/* Student Skill Development */}
      <div className="grid md:grid-cols-2 gap-8 items-center group">
        <img
          src="/iit.png"
          alt="Student Skill Development"
          className="rounded-xl shadow-md transform transition duration-500 group-hover:scale-105 group-hover:shadow-red-300"
        />
        <div className="transition duration-500 group-hover:translate-x-2">
          <h2 className="text-2xl font-bold text-red-500 border-l-4 border-red-500 pl-3 group-hover:text-red-600 transition">
            Student Skill Development
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed group-hover:text-gray-900 transition">
            InfoBeans Foundation partnered with IITI Drishti CPS Foundation, Indian
            Institute of Technology, Indore, to empower more than 250 financially
            underprivileged students. This partnership opens doors to enhanced
            resources and expertise from IIT Indore, enabling to broaden our training
            programs to cover cutting-edge technologies.
          </p>
        </div>
      </div>

      {/* The Joy of Donating Blood */}
      <div className="grid md:grid-cols-2 gap-8 items-center group">
        <div className="transition duration-500 group-hover:-translate-x-2">
          <h2 className="text-2xl font-bold text-red-500 border-l-4 border-red-500 pl-3 group-hover:text-red-600 transition">
            The Joy of Donating Blood
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed group-hover:text-gray-900 transition">
            We believe the gift of blood is the gift of life. And hence, we launched
            in-house blood donation campaigns that aim to raise awareness about the
            importance and benefits of donating blood, spreading the culture of social
            work as well as highlighting its health effects in the community. We
            received immense support from our team members who contributed to their
            best to help society.
          </p>
        </div>
        <img
          src="/blood.png"
          alt="Blood Donation Drive"
          className="rounded-xl shadow-md transform transition duration-500 group-hover:scale-105 group-hover:shadow-red-300"
        />
      </div>

      {/* Go Green */}
      <div className="grid md:grid-cols-2 gap-8 items-center group">
        <img
          src="/tree.png"
          alt="Go Green Plantation Drive"
          className="rounded-xl shadow-md transform transition duration-500 group-hover:scale-105 group-hover:shadow-red-300"
        />
        <div className="transition duration-500 group-hover:translate-x-2">
          <h2 className="text-2xl font-bold text-red-500 border-l-4 border-red-500 pl-3 group-hover:text-red-600 transition">
            Go Green
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed group-hover:text-gray-900 transition">
            InfoBeans continues its efforts to bring eco-friendly and sustainable
            changes in the community that we live in. We hosted multiple plantation
            drives where our teammates planted saplings and pledged to nurture them.
            These saplings flourished and brought a positive impact on our environment.
          </p>
        </div>
      </div>
    </div>
  );
}
