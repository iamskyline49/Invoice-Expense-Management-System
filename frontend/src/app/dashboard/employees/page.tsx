"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import api from "@/app/services/api";

type Employee = {
  id: number;
  username: string;
  fullName: string;
  salary: string;
  bonus: string;
};

type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
};

export default function EmployeesPage() {
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<any>("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("add");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editUsername, setEditUsername] = useState<string>("");
  const [editFullName, setEditFullName] = useState<string>("");
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [taskUsername, setTaskUsername] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskDeadline, setTaskDeadline] = useState<string>("");
  const [showTasksModal, setShowTasksModal] = useState<boolean>(false);
  const [employeeTasks, setEmployeeTasks] = useState<Task[]>([]);
  const [taskEmployeeName, setTaskEmployeeName] = useState<string>("");
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);
  const [taskStatus, setTaskStatus] = useState<string>("pending");
  const [showSalaryModal, setShowSalaryModal] = useState<boolean>(false);
  const [salaryUsername, setSalaryUsername] = useState<string>("");
  const [currentSalary, setCurrentSalary] = useState<string>("0");
  const [currentBonus, setCurrentBonus] = useState<string>("0");
  const [incrementAmount, setIncrementAmount] = useState<string>("");
  const [deductAmount, setDeductAmount] = useState<string>("");
  const [bonusAmount, setBonusAmount] = useState<string>("");

  const addEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/manager/employee",
        {
          username,
          fullName,
          salary,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSuccess("Employee added successfully");
      setError("");
      getEmployees();
      setUsername("");
      setFullName("");
      setSalary("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        setError(errorMessage);
      } else {
        setError(errorMessage || "Something went wrong");
      }
    }
  };

  const getEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/manager/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchEmployees = async (name: string) => {
    try {
      const token = localStorage.getItem("token");
      if (name.trim() === "") {
        getEmployees();
        return;
      }
      const response = await api.get(`/manager/employee/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/manager/employee/${selectedEmployee}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getEmployees();
      setShowDeleteModal(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        setError(errorMessage);
      } else {
        setError(errorMessage || "Failed to delete employee");
      }
    }
  };

  const updateEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/manager/employee/${editUsername}`,
        {
          fullName: editFullName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getEmployees();
      setShowEditModal(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        setError(errorMessage);
      } else {
        setError(errorMessage || "Failed to update employee");
      }
    }
  };

  const assignTask = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        `/manager/employee/${taskUsername}/task`,
        {
          title: taskTitle,
          description: taskDescription,
          deadline: taskDeadline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSuccess("Task assigned successfully");
      setShowTaskModal(false);
      setTaskTitle("");
      setTaskDescription("");
      setTaskDeadline("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        setError(errorMessage);
      } else {
        setError(errorMessage || "Failed to assign task");
      }
    }
  };

  const getEmployeeTasks = async (username: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/manager/employee/${username}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployeeTasks(response.data.data);
      setTaskEmployeeName(username);
      setShowTasksModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/manager/task/${selectedTaskId}`,
        {
          status: taskStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      getEmployeeTasks(taskEmployeeName);
      setShowStatusModal(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        setError(errorMessage);
      } else {
        setError(errorMessage || "Failed to update status");
      }
    }
  };

  const openSalaryModal = (employee: Employee) => {
    setSalaryUsername(employee.username);
    setCurrentSalary(employee.salary);
    setCurrentBonus(employee.bonus);
    setShowSalaryModal(true);
  };

  const incrementSalary = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/manager/employee/${salaryUsername}/salary/increment`,
        {
          amount: incrementAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getEmployees();
      setIncrementAmount("");
      setSuccess("Salary incremented successfully");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        setError(errorMessage);
      } else {
        setError(errorMessage || "Failed to increment salary");
      }
    }
  };

  const deductSalary = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/manager/employee/${salaryUsername}/salary/deduct`,
        {
          amount: deductAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getEmployees();
      setDeductAmount("");
      setSuccess("Salary deducted successfully");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        setError(errorMessage);
      } else {
        setError(errorMessage || "Failed to deduct salary");
      }
    }
  };

  const addBonus = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/manager/employee/${salaryUsername}/bonus`,
        {
          amount: bonusAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getEmployees();
      setBonusAmount("");
      setSuccess("Bonus added successfully");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        setError(errorMessage);
      } else {
        setError(errorMessage || "Failed to add bonus");
      }
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center gap-4 pt-10">
        <button
          onClick={() => setActiveSection("add")}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeSection === "add"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
        >
          Add Employee
        </button>
        <button
          onClick={() => setActiveSection("list")}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeSection === "list"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
        >
          Employee List
        </button>
      </div>

      <div className="flex flex-col items-center py-10">
        {activeSection === "add" && (
          <form
            onSubmit={addEmployee}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
          >
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Add Employee
            </h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 text-black"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 text-black"
            />
            <input
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 text-black"
            />
            {success && <p className="text-green-600 mb-4">{success}</p>}
            {error && (
              <div className="bg-red-100 text-red-600 border border-red-300 p-3 rounded-lg mb-4">
                {Array.isArray(error) ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {error.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{error}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg"
            >
              Add Employee
            </button>
          </form>
        )}

        {activeSection === "list" && (
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-7xl">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Employee List
            </h2>
            <input
              type="text"
              placeholder="Search employee by fullname"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchEmployees(e.target.value);
              }}
              className="w-full border p-3 rounded-lg mb-6 text-black"
            />
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 text-left">Username</th>
                  <th className="p-3 text-left">Full Name</th>
                  <th className="p-3 text-left">Salary</th>
                  <th className="p-3 text-left">Bonus</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b">
                    <td className="p-3">
                      <Link
                        href={`/dashboard/employees/${employee.username}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {employee.username}
                      </Link>
                    </td>

                    <td className="p-3 text-black">{employee.fullName}</td>
                    <td className="p-3 text-black">৳ {employee.salary}</td>
                    <td className="p-3 text-black">৳ {employee.bonus}</td>
                    <td className="p-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => openSalaryModal(employee)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                      >
                        Salary
                      </button>
                      <button
                        onClick={() => getEmployeeTasks(employee.username)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                      >
                        View Tasks
                      </button>
                      <button
                        onClick={() => {
                          setTaskUsername(employee.username);
                          setShowTaskModal(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Assign Task
                      </button>
                      <button
                        onClick={() => {
                          setEditUsername(employee.username);
                          setEditFullName(employee.fullName);
                          setShowEditModal(true);
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee.username);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-96">
            <h2 className="text-2xl font-bold text-red-600 mb-6">
              Delete Employee
            </h2>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedEmployee}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={deleteEmployee}
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96">
            <h2 className="text-2xl font-bold text-yellow-600 mb-6">
              Edit Employee
            </h2>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Username</label>
              <div className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100">
                {editUsername}
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg text-black"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={updateEmployee}
                className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-500px">
            <h2 className="text-2xl font-bold text-green-600 mb-6">
              Assign Task
            </h2>
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 text-black"
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 text-black"
              rows={4}
            />
            <input
              type="date"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
              className="w-full border p-3 rounded-lg mb-6 text-black"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowTaskModal(false)}
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={assignTask}
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
      {showTasksModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 overflow-y-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-600">
                {taskEmployeeName} Tasks
              </h2>
              <button
                onClick={() => setShowTasksModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Deadline</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeTasks.map((task) => (
                  <tr key={task.id} className="border-b">
                    <td className="p-3">{task.title}</td>
                    <td className="p-3">{task.deadline}</td>
                    <td className="p-3">{task.status}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedTaskId(task.id);
                          setTaskStatus(task.status);
                          setShowStatusModal(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Update Task Status
            </h2>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="w-full border p-3 rounded-lg mb-6 text-black"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowStatusModal(false)}
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={updateTaskStatus}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {showSalaryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-550px">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">
              Salary Management
            </h2>
            <p className="mb-2">
              <span className="font-bold">Employee:</span> {salaryUsername}
            </p>
            <p className="mb-2">
              <span className="font-bold">Salary:</span> ৳ {currentSalary}
            </p>
            <p className="mb-6">
              <span className="font-bold">Bonus:</span> ৳ {currentBonus}
            </p>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">
                  Increment Salary
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                    className="flex-1 border p-3 rounded-lg text-black"
                  />
                  <button
                    onClick={incrementSalary}
                    className="bg-green-600 text-white px-5 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Deduct Salary</label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={deductAmount}
                    onChange={(e) => setDeductAmount(e.target.value)}
                    className="flex-1 border p-3 rounded-lg text-black"
                  />

                  <button
                    onClick={deductSalary}
                    className="bg-red-600 text-white px-5 rounded-lg"
                  >
                    Deduct
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Add Bonus</label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={bonusAmount}
                    onChange={(e) => setBonusAmount(e.target.value)}
                    className="flex-1 border p-3 rounded-lg text-black"
                  />
                  <button
                    onClick={addBonus}
                    className="bg-blue-600 text-white px-5 rounded-lg"
                  >
                    Bonus
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setShowSalaryModal(false)}
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
