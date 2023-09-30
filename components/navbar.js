import React from "react";

import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
  getKindeServerSession
} from "@kinde-oss/kinde-auth-nextjs/server";

export default function Navbar() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = getUser();
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li><LogoutLink className="text-subtle">Log out</LogoutLink></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="normal-case text-xl font-mono">SENDIT</Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="flex items-center gap-1">
              {!isAuthenticated() ? (
                <>
                  <LoginLink className="btn accent text-white hover:bg-blue-600 ">Sign in</LoginLink>
                  <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
                </>
              ) : (
                <div className="flex items-center gap-1 p-2">
                  {user?.picture ? (
                    <img
                      className=" h-10 w-10 rounded-full ring-2 ring-white"
                      src={user?.picture}
                      alt="user profile avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full ring-2 ring-white">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <p className="text-base">
                      {user?.given_name.toUpperCase()}
                    </p>
                    <LogoutLink className="btn accent hover:bg-blue-600 text-white ">Log out</LogoutLink>
                  </div>
                </div>
              )}
            </div>
      </div>
    </div>
  );
}
