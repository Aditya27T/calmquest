import React from "react";

// make about us componnet
export function AboutUsCard() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
            <span className="text-purple-700">Image</span>
            </div>
            <div>
            <h3 className="text-lg font-semibold text-purple-900">Nama</h3>
            {/* Role */}
            <p className="text-gray-600">Role</p>
            </div>
        </div>
    </div>
    );
}


