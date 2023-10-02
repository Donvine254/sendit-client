import React from "react";

import Link from "next/link";
import Image from "next/image";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default function Navbar() {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const user = getUser();
  const isAdmin = getPermission("admin").isGranted;

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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/deliveries">Deliveries</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="quote">Get a Quote</Link>
            </li>
            {isAuthenticated() && (
              <li>
                <LogoutLink className="text-subtle text-white hover:text-black accent">Log out</LogoutLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center self-center">
        <Link href="/">
          <Image
            src="./logo.svg"
            width={120}
            height={20}
            className="self-center mb-3"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-1">
          {!isAuthenticated() ? (
            <>
              <LoginLink className="btn btn-ghost xsm:btn-sm xsm:mt-2 hover:bg-blue-600 hover:text-white ">
                Sign in
              </LoginLink>
              <RegisterLink className="btn btn-ghost xsm:hidden">
                Sign up
              </RegisterLink>
            </>
          ) : (
            <div className="flex items-center gap-2 p-2">
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
                  <span className="badge badge-xs accent indicator-item"></span>
                </div>
              </button>
              {user?.picture ? (
                <Image
                  className="xsm:h-8 xsm:w-8 h-10 w-10 rounded-full ring-2 ring-blue-800 ring-offset-base-100 ring-offset-2 mb-3"
                  src={user?.picture}
                  width={40}
                  height={40}
                  alt="user profile avatar"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="xsm:h-8 xsm:w-8 h-10 w-10 flex items-center justify-center accent text-white rounded-full ring-2 ring-red-300 ring-offset-2 ">
                  {user?.given_name?.[0].toUpperCase()}
                  {user?.family_name?.[0].toUpperCase()}
                </div>
              )}
              <div className="hidden md:inline-block">
                <p className="text-base font-bold">
                  {user?.given_name.toUpperCase()}
                </p>
                <p className="text-base text-gray-500">
                  {isAdmin ? "Admin" : "User"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
