"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2, FiShieldOff } from "react-icons/fi";
import {
  updateAdminUserRole,
  deleteAdminUser,
} from "@/lib/actions/admin-action/userActions";

/**
 * AdminUserActionButtons
 * Actions for admin user management:
 *  - Role selection dropdown ('seeker' | 'recruiter' | 'admin')
 *  - User delete button with `@heroui/react` AlertDialog confirmation
 *
 * CRITICAL RULE: Admin cannot change their own role or delete their own account.
 * Controls are disabled for the logged-in admin user.
 *
 * @param {{ user: Object, currentUser: Object }} props
 */
const AdminUserActionButtons = ({ user, currentUser }) => {
  const [isPendingRole, setIsPendingRole] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  // Check if target user is the logged-in admin
  const isSelf = Boolean(
    currentUser &&
    ((user._id &&
      currentUser._id &&
      String(user._id) === String(currentUser._id)) ||
      (user._id &&
        currentUser.id &&
        String(user._id) === String(currentUser.id)) ||
      (user.email &&
        currentUser.email &&
        user.email.toLowerCase() === currentUser.email.toLowerCase())),
  );

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    if (isSelf || newRole === user.role) return;

    setIsPendingRole(true);
    const toastId = toast.loading(
      `Updating role for "${user.name || user.email}"…`,
    );
    try {
      const res = await updateAdminUserRole(user._id, newRole);
      if (res?.success === false) {
        throw new Error(res?.message || "Role update failed");
      }
      toast.success(
        `Role for "${user.name || user.email}" updated to ${newRole}.`,
        {
          id: toastId,
        },
      );
      router.refresh();
    } catch (err) {
      console.error("Role update error:", err);
      toast.error(err.message || "Failed to update role. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsPendingRole(false);
    }
  };

  const handleDelete = async () => {
    if (isSelf) return;

    setIsPendingDelete(true);
    const toastId = toast.loading(
      `Deleting user "${user.name || user.email}"…`,
    );
    try {
      const res = await deleteAdminUser(user._id);
      if (res?.success === false) {
        throw new Error(res?.message || "User deletion failed");
      }
      setIsDeleteDialogOpen(false);
      toast.success(`User "${user.name || user.email}" has been deleted.`, {
        id: toastId,
      });
      router.refresh();
    } catch (err) {
      console.error("Delete user error:", err);
      toast.error(err.message || "Failed to delete user. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsPendingDelete(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2.5">
      {/* Role Selector Dropdown */}
      <div className="relative">
        <select
          id={`role-select-${user._id}`}
          value={user.role || "seeker"}
          onChange={handleRoleChange}
          disabled={isSelf || isPendingRole}
          title={
            isSelf
              ? "You cannot change your own admin role"
              : "Change user role"
          }
          aria-label={`Change role for ${user.name || user.email}`}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border transition-all duration-200 focus:outline-none ${
            isSelf
              ? "border-zinc-800 text-zinc-500 bg-zinc-900/40 cursor-not-allowed opacity-60"
              : "border-zinc-700 text-zinc-200 hover:border-zinc-600 focus:border-primary cursor-pointer"
          }`}
        >
          <option value="seeker">Seeker</option>
          <option value="recruiter">Recruiter</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Delete User Button with Confirmation Modal */}
      {isSelf ? (
        <button
          disabled
          title="You cannot delete your own account"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
            text-zinc-600 bg-zinc-900/40 border border-zinc-800/80 cursor-not-allowed opacity-50"
        >
          <FiShieldOff className="size-3.5" />
          <span>You</span>
        </button>
      ) : (
        <AlertDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialog.Trigger>
            <button
              id={`delete-user-${user._id}`}
              type="button"
              title="Delete User"
              aria-label={`Delete user ${user.name || user.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                text-rose-400 bg-rose-500/10 border border-rose-500/20
                hover:bg-rose-500/20 hover:border-rose-500/30 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <FiTrash2 className="size-3.5" />
              <span>Delete</span>
            </button>
          </AlertDialog.Trigger>

          <AlertDialog.Backdrop variant="blur">
            <AlertDialog.Container>
              <AlertDialog.Dialog
                className="bg-[#0e0e10] border border-zinc-800/80 text-zinc-100 rounded-2xl
                  shadow-2xl shadow-black/60 p-0 overflow-hidden max-w-md w-full"
              >
                {/* Header */}
                <AlertDialog.Header className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-zinc-800/60">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                    <AlertDialog.Icon
                      status="danger"
                      className="text-rose-400 size-5"
                    />
                  </div>
                  <div>
                    <AlertDialog.Heading className="text-base font-bold text-white">
                      Delete User Account
                    </AlertDialog.Heading>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      This action cannot be undone.
                    </p>
                  </div>
                </AlertDialog.Header>

                {/* Body */}
                <AlertDialog.Body className="px-6 py-5">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Are you sure you want to delete user{" "}
                    <span className="text-white font-semibold">
                      &ldquo;{user.name || user.email}&rdquo;
                    </span>
                    ? All associated profile details and data will be
                    permanently removed.
                  </p>
                </AlertDialog.Body>

                {/* Footer */}
                <AlertDialog.Footer className="px-6 pb-6 flex justify-end gap-3">
                  <Button
                    slot="close"
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-300
                      bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700
                      transition-all duration-200 cursor-pointer"
                  >
                    Cancel
                  </Button>

                  <button
                    onClick={handleDelete}
                    disabled={isPendingDelete}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-white
                      bg-rose-600 hover:bg-rose-500 disabled:opacity-60 disabled:cursor-not-allowed
                      transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    {isPendingDelete ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting…
                      </>
                    ) : (
                      "Confirm Delete"
                    )}
                  </button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      )}
    </div>
  );
};

export default AdminUserActionButtons;
