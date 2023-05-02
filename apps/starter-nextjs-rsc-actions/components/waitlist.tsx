import { getXataClient } from "@/services/xata";

async function create(formData: FormData) {
  "use server";
  const xata = getXataClient();

  const email = formData.get("email");
  if (typeof email === "string") {
    await xata.db.emails.create({ email });
  }
}

export default function Waitlist() {
  return (
    <form action={create} className="flex gap-6 mb-6">
      <input
        type="email"
        id="email"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="picard@enterprise.com"
        required
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
