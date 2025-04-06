"use client"
import React from 'react'

function Page() {
    
  return (
      <div className="px-5 min-h-52 mb-10">
          <div className="text-4xl flex items-center justify-center text-center mt-10 font-bold">
              <p className="w-52 p-4 border-b-4">Orders</p>
          </div>
          <div className="overflow-x-auto mt-5">
              <table className="table w-full table-zebra border border-secondary">
                  <thead>
                      <tr>
                          <th className="bg-secondary text-primary border border-secondary">
                              Order ID
                          </th>
                          <th className="bg-secondary text-primary border border-secondary">
                              User Name  
                          </th>
                          <th className="bg-secondary text-primary border border-secondary">
                              User Address
                          </th>
                          <th className="bg-secondary text-primary border border-secondary">
                              Items
                          </th>
                          <th className="bg-secondary text-primary border border-secondary">
                              User contact
                          </th>
                          <th className="bg-secondary text-primary border border-secondary">
                              Total Price
                          </th>
                          <th className="bg-secondary text-primary border border-secondary">
                              Status
                          </th>
                          <th className="bg-secondary text-primary border border-secondary">
                              Created At
                          </th>
                          <th className="bg-secondary text-primary border border-secondary">
                              Rating
                          </th>
                      </tr>
                  </thead>
                  <tbody className="bg-base-100">
                      <tr>
                          <td className="border border-secondary">
                              <div className="flex items-center space-x-3">
                                  <div className="text-sm font-bold text-primary">
                                      #RT001
                                  </div>
                              </div>
                          </td>
                          <td className="border border-secondary">
                              <div className="flex items-center space-x-3">
                                  <div className="text-sm font-bold text-primary">
                                      NAme
                                  </div>
                              </div>
                          </td>
                          <td className="border border-secondary">
                              <div className="flex items-center space-x-3">
                                  <div className="text-sm font-bold text-primary">
                                      address
                                  </div>
                              </div>
                          </td>
                          <td className="border border-secondary p-0">
                              <table className="table w-full border-collapse">
                                  <tbody>
                                      <tr className="hover">
                                          <td className="px-2 py-1 border-b border-secondary">
                                              <div className="flex items-center space-x-3">
                                                  <div className="text-sm font-bold text-primary">
                                                      email
                                                  </div>
                                              </div>
                                          </td>
                                      </tr>
                                      <tr className="hover">
                                          <td className="px-2 py-1 border-t border-secondary">
                                              <div className="flex items-center space-x-3">
                                                  <div className="text-sm font-bold text-primary">
                                                      phone
                                                  </div>
                                              </div>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                          <td className="border border-secondary p-0">
                              <table className="table w-full border-collapse">
                                  <tbody>
                                      <tr className="hover">
                                          <td className="px-2 py-1 border-b border-secondary">
                                              <div className="flex items-center space-x-3">
                                                  <div className="text-sm font-bold text-primary">
                                                      1 x
                                                  </div>
                                                  <div className="text-sm font-bold text-primary">
                                                      Item Name
                                                  </div>
                                                  <div className="text-sm font-bold text-primary">
                                                      $12.99
                                                  </div>
                                              </div>
                                          </td>
                                      </tr>
                                      <tr className="hover">
                                          <td className="px-2 py-1 border-t border-secondary">
                                              <div className="flex items-center space-x-3">
                                                  <div className="text-sm font-bold text-primary">
                                                      2 x
                                                  </div>
                                                  <div className="text-sm font-bold text-primary">
                                                      Item Name
                                                  </div>
                                                  <div className="text-sm font-bold text-primary">
                                                      $24.99
                                                  </div>
                                              </div>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                          <td className="border border-secondary">
                              <div className="text-sm font-bold text-primary">
                                  $37.98
                              </div>
                          </td>
                          <td className="border border-secondary">
                              <div className="text-sm font-bold text-primary">
                                  Pending
                              </div>
                          </td>
                          <td className="border border-secondary">
                              <div className="text-sm font-bold text-primary">
                                  22nd Feb 2023
                              </div>
                          </td>
                          <td className="border border-secondary">
                              <div className="text-sm font-bold text-primary">
                                  X
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  );
}

export default Page