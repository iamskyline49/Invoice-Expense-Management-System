import Link from "next/link";
import Navbar from "../../../components/Navbar";
import axios from "axios";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

async function getEmployee(username: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/manager/public/employee/${username}`,
    );

    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function EmployeeDetailsPage({ params }: Props) {
  const { username } = await params;
  const data = await getEmployee(username);
  const employee = data?.data;

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">
        Employee not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Employee Details</h1>
          <Link
            href="/dashboard/employees"
            className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
          >
            Back
          </Link>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-700">Username</h2>
            <p className="text-xl text-black">{employee.username}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700">Full Name</h2>
            <p className="text-xl text-black ">{employee.fullName}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700">Salary</h2>
            <p className="text-xl text-black">৳ {employee.salary}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-700">Bonus</h2>
            <p className="text-xl text-black">৳ {employee.bonus}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700">Deduction</h2>
            <p className="text-xl text-black">৳ {employee.deduction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
