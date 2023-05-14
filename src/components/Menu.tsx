'use client'
import { signOut } from "next-auth/react";
export default function Page() {
      return (
            <div className="row">
                  <div className="menu">
                        <div className="logo">

                        </div>

                        <div className="logout text-end">
                              <button onClick={() => signOut()} className=" btn btn-secondary">
                                    Sign Out
                              </button>
                        </div>
                  </div>
            </div>
      )
}