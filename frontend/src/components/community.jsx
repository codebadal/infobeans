export default function CommunityInitiativesDark() {
  return (
    <div className="bg-gray-900 py-12 px-6 md:px-16 space-y-16 text-gray-100">
      
      {/* Student Skill Development */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="/iit.png"
          alt="Student Skill Development"
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-white border-l-4 border-pink-500 pl-3">
            Student Skill Development
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            InfoBeans Foundation partnered with IITI Drishti CPS Foundation, Indian
            Institute of Technology, Indore, to empower more than 250 financially
            underprivileged students. This partnership opens doors to enhanced
            resources and expertise from IIT Indore, enabling to broaden our training
            programs to cover cutting-edge technologies.
          </p>
        </div>
      </div>

      {/* The Joy of Donating Blood */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold text-white border-l-4 border-pink-500 pl-3">
            The Joy of Donating Blood
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
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
          className="rounded-xl shadow-lg"
        />
      </div>

      {/* Go Green */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="/tree.png"
          alt="Go Green Plantation Drive"
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-white border-l-4 border-pink-500 pl-3">
            Go Green
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
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
