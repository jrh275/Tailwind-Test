"use client";

type Person = {
  name: string;
  title: string;
  email: string;
  role: string;
};

const people: Person[] = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
  {
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
  },
  {
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
  },
  {
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
];

export default function UsersTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-typography-midnight">
              Users
            </h1>
            <p className="mt-2 text-sm text-typography-foggy">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-brand-royal px-3 py-2 text-center text-sm font-semibold text-typography-white shadow-xs hover:bg-brand-royal-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-royal"
            >
              Add user
            </button>
          </div>
        </div>
      </div>

      {/* Table (borderless) */}
      <div className="mt-6 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-xs font-medium uppercase tracking-wide text-typography-foggy sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-typography-foggy"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-typography-foggy"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-typography-foggy"
                  >
                    Role
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {people.map((person) => (
                  <tr key={person.email} className="hover:bg-base-faint/50">
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-typography-midnight sm:pl-0">
                      {person.name}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-typography-foggy">
                      {person.title}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-typography-foggy">
                      {person.email}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-typography-foggy">
                      {person.role}
                    </td>
                    <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                      <a
                        href="#"
                        className="text-brand-royal hover:text-brand-royal-hover"
                      >
                        Edit<span className="sr-only">, {person.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Optional: subtle separator at the bottom (remove if you want 100% borderless) */}
            {/* <div className="mt-4 h-px bg-base-cloudy/50" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
