// 'use client';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useEffect, useRef, useState } from "react";
import { userService } from "../modules/users/application/userService";
import type { User } from "../modules/users/domain/entity";
import { localStorageUserRepository } from "../modules/users/infrastructure/db/localStorageUserRepository";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const localStorageRepository = localStorageUserRepository();
// const postgresRepository = postgresUserRepository();
const userServiceInstance = userService(localStorageRepository);

export default function ListOfUsers() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [editedUserId, setEditedUserId] = useState<number | null>(null);
  // Refeerencias inputs edit form
  const nameEditRef = useRef<HTMLInputElement>(null);
  const emailEditRef = useRef<HTMLInputElement>(null);
  const githubEditRef = useRef<HTMLInputElement>(null);
  const statusEditRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch users from service
    userServiceInstance.getAllUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
    });
  }, []);

  const sumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    // Create a new user object
    const newUser: User = {
      id: Date.now(),
      name: name,
      email: `${name.toLowerCase().replace(" ", "_")}@example.com`,
      github: name.toLowerCase().replace(" ", "_"),
      status: "Live",
    };

    // Call the service to create the user
    userServiceInstance.createUser(newUser).then(() => {
      // Update local state
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });
  };

  const submitEditHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("nameEdit") as string;
    const email = formData.get("emailEdit") as string;
    const github = formData.get("githubEdit") as string;
    const status = formData.get("statusEdit") as string;

    // For demonstration, we'll edit the first user in the list
    if (!editedUserId) return;

    const updatedUserData: Partial<User> = {
      name,
      email,
      github,
      status,
    };

    userServiceInstance.updateUser(editedUserId, updatedUserData).then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editedUserId ? { ...user, ...updatedUserData } : user
        )
      );
    });
  };

  const deleteHandler = (userId: number) =>
    userServiceInstance.removeUser(userId).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    });

  const editHandler = (userId: number) => {
    setEditedUserId(userId);
    //Pintar en el formulario los datos del usuario a editar
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      if (nameEditRef.current) nameEditRef.current.value = userToEdit.name;
      if (emailEditRef.current) emailEditRef.current.value = userToEdit.email;
      if (githubEditRef.current)
        githubEditRef.current.value = userToEdit.github;
      if (statusEditRef.current)
        statusEditRef.current.value = userToEdit.status;
    }
  };

  const searchHandler = (userId: number) => {
    userServiceInstance.findById(userId).then((user) => {
      if (user) {
        alert(
          `User Found: ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Github: ${user.github}, Status: ${user.status}`
        );
      } else {
        alert("User not found");
      }
    });
  };

  return (
    <>
      <form onSubmit={sumbitHandler}>
        <input
          className="mx-auto max-w-xs"
          placeholder="Enter name:"
          name="name"
        />
        <button type="submit">Add User</button>
      </form>
      <form onSubmit={submitEditHandler}>
        <input
          ref={nameEditRef}
          className="mx-auto max-w-xs"
          placeholder="Enter name:"
          name="nameEdit"
        />
        <input
          ref={emailEditRef}
          className="mx-auto max-w-xs"
          placeholder="Enter email:"
          name="emailEdit"
        />
        <input
          ref={githubEditRef}
          className="mx-auto max-w-xs"
          placeholder="Enter github:"
          name="githubEdit"
        />
        <input
          ref={statusEditRef}
          className="mx-auto max-w-xs"
          placeholder="Enter status:"
          name="statusEdit"
        />
        <button type="submit">Edit User</button>
      </form>
      <Card>
        <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
          <div>
            <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Workspaces
            </h3>
            <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              Overview of all registered workspaces within your organization.
            </p>
          </div>
        </div>
        <Table className="mt-8">
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Id
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Nombre
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Email
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Github
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Estado
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Acciones
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-tremor-border dark:border-dark-tremor-border"
              >
                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {item.id}
                </TableCell>
                <TableCell>
                  <img
                    className="rounded-full w-8 h-8 border border-gray-300 inline-block mr-2"
                    src={`https://unavatar.io/github/${item.github}`}
                    alt={item.github}
                  />
                  {item.name}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.github}</TableCell>
                <TableCell>
                  <span
                    className={classNames(
                      item.status === "Live"
                        ? "bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-500/20 dark:text-emerald-500 dark:ring-emerald-400/20"
                        : "bg-orange-100 text-orange-800 ring-orange-600/10 dark:bg-orange-500/20 dark:text-orange-500 dark:ring-orange-400/20",
                      "inline-flex items-center rounded-tremor-small px-2 py-0.5 text-tremor-label font-medium ring-1 ring-inset"
                    )}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => editHandler(item.id)}
                    className="rounded-tremor-small bg-tremor-secondary/10 px-3 py-1 text-tremor-secondary hover:bg-tremor-secondary/20 dark:bg-dark-tremor-secondary/10 dark:text-dark-tremor-secondary dark:hover:bg-dark-tremor-secondary/20"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteHandler(item.id)}
                    className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-red-400 px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-red-500 dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => searchHandler(item.id)}
                    className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-gray-400 px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-gray-500 dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
                  >
                    B
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>{" "}
    </>
  );
}
