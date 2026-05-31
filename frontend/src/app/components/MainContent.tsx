import Image from "next/image";

function MainContent() {
  return (
    <div className="w-full overflow-x-hidden m-auto p-2 bg-slate-50 flex flex-col gap-2 justify-center">
      <div className="flex gap-1 justify-start border border-slate-200 bg-white shadow-sm rounded-md m-2 p-2">
        <div className="flex flex-col gap-2 justify-center p-4">
          <h1 className="text-slate-900 text-3xl font-serif outline-slate-400">
            About Our Company
          </h1>
          <p className="text-slate-600 text-xl font-serif">
            Our system helps manage company activities in an organized way. It
            allows different users to work based on their roles and
            responsibilities.
          </p>
          <p className="text-slate-500 text-lg font-serif italic outline-slate-400">
            The main goal of this system is to make office management easier,
            faster, and more secure.
          </p>
        </div>
        <Image
          src="/static-images/one.png"
          alt="main image"
          width={600}
          height={400}
          className="shadow-sm rounded-md w-fit hover:-translate-y-1.5 transition"
        />
      </div>
      <div className="flex flex-col gap-4 bg-transparent p-4">
        <h2 className="text-slate-900 text-2xl font-serif">
          Features and Services
        </h2>
        <p className="text-slate-600 text-lg italic font-serif">
          Our system provides different features for different types of users.
          Each user has specific access and tasks.
        </p>
        <hr className="border-t-2 border-slate-200 mx-4" />
        <div className="flex gap-2 border border-slate-200 bg-white shadow-sm rounded-md p-4">
          <Image
            src="/static-images/two.png"
            alt="admin image"
            width={400}
            height={200}
            className="shadow-sm rounded-md hover:-translate-y-1.5 transition"
          />
          <div>
            <h3 className="text-slate-900 text-2xl font-serif">Admin</h3>
            <p className="text-slate-600 text-xl font-serif">
              The Admin role is designed to oversee and manage the entire system
              comprehensively from a centralized dashboard. This includes the
              ability to seamlessly add, modify, or remove user accounts, update
              critical company information across departments, and securely
              manage access control policies to ensure data integrity and
              organizational security at all times.
            </p>
          </div>
        </div>
        <div className="flex gap-2 border border-slate-200 bg-white shadow-sm rounded-md p-4">
          <div>
            <h3 className="text-slate-900 text-2xl font-serif">Manager</h3>
            <p className="text-slate-600 text-xl font-serif">
              Managers are equipped with powerful tools to effectively oversee
              employee performance, assign and track tasks in real-time, and
              evaluate overall project progress. They can monitor daily work
              activities natively, ensuring that team goals are met efficiently
              while maintaining clear communication and workflow transparency
              throughout their respective departments.
            </p>
          </div>
          <Image
            src="/static-images/three.png"
            alt="manager image"
            width={400}
            height={200}
            className="shadow-sm rounded-md hover:-translate-y-1.5 transition"
          />
        </div>
        <div className="flex  gap-2 border border-slate-200 bg-white shadow-sm rounded-md p-4">
          <Image
            src="/static-images/four.png"
            alt="employee image"
            width={400}
            height={200}
            className="shadow-sm rounded-md hover:-translate-y-1.5 transition"
          />
          <div>
            <h3 className="text-slate-900 text-2xl font-serif">Employee</h3>
            <p className="text-slate-600 text-xl font-serif">
              Employees have access to a streamlined interface where they can
              easily view their assigned tasks, update project statuses as they
              progress, and formally submit completed work. Additionally, the
              portal allows them to quickly access and manage their personal
              profile, review their performance metrics, and stay updated with
              company-wide announcements.
            </p>
          </div>
        </div>
        <div className="flex gap-2 border border-slate-200 bg-white shadow-sm rounded-md p-4">
          <div>
            <h3 className="text-slate-900 text-2xl font-serif">Accountant</h3>
            <p className="text-slate-600 text-xl font-serif">
              The Accountant role provides robust financial management
              capabilities, allowing users to accurately process payroll and
              manage salary distributions. They can securely track all payment
              records, monitor company expenses in detail, and generate
              comprehensive financial reports, thereby ensuring the organization
              maintains a healthy, transparent, and organized financial
              ecosystem.
            </p>
          </div>
          <Image
            src="/static-images/five.png"
            alt="accountant image"
            width={400}
            height={200}
            className="shadow-sm rounded-md hover:-translate-y-1.5 transition"
          />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
