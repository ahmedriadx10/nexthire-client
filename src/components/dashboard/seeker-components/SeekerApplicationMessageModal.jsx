"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { FiMessageSquare, FiBriefcase, FiUser, FiFileText } from "react-icons/fi";

/**
 * SeekerApplicationMessageModal
 * Modal to display job seeker's submitted cover message and application info.
 *
 * @param {Object} props
 * @param {string} [props.message] - Submitted message string.
 * @param {string} [props.jobName] - Job title.
 * @param {string} [props.name] - Candidate name.
 * @param {string} [props.email] - Candidate email.
 * @param {string} [props.phone] - Candidate phone number.
 * @param {string} [props.resumeDriveLink] - Resume link.
 */
const SeekerApplicationMessageModal = ({
  message,
  jobName,
  name,
  email,
  phone,
  resumeDriveLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasMessage = Boolean(message && message.trim());

  if (!hasMessage) {
    return (
      <div
        title="No message provided"
        className="p-2 rounded-lg text-zinc-700 cursor-not-allowed select-none opacity-50 inline-flex items-center justify-center"
      >
        <FiMessageSquare className="size-4" />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        title="View cover message"
        aria-label={`View cover message for ${jobName || "application"}`}
        className="p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
      >
        <FiMessageSquare className="size-4" />
      </button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-lg bg-[#0e0e10] border border-zinc-800/80 text-zinc-100 rounded-2xl shadow-2xl p-0 overflow-hidden relative max-h-[85vh] flex flex-col">
              {/* Header */}
              <Modal.Header className="px-6 pt-6 pb-4 border-b border-zinc-900 flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <FiMessageSquare className="size-5" />
                </div>
                <div>
                  <Modal.Heading className="text-lg font-bold text-white tracking-tight">
                    Application Message
                  </Modal.Heading>
                  {jobName && (
                    <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
                      <FiBriefcase className="size-3 text-primary shrink-0" />
                      <span>
                        Applied for: <strong className="text-zinc-200 font-semibold">{jobName}</strong>
                      </span>
                    </p>
                  )}
                </div>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="px-6 py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 space-y-4">
                {(name || email || phone) && (
                  <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 space-y-1 text-xs text-zinc-400">
                    {name && (
                      <p className="flex items-center gap-2 text-zinc-200 font-medium">
                        <FiUser className="size-3.5 text-zinc-400" />
                        <span>{name}</span>
                      </p>
                    )}
                    {email && <p className="pl-5 text-zinc-400">{email}</p>}
                    {phone && <p className="pl-5 text-zinc-400">{phone}</p>}
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Cover Note / Message
                  </h4>
                  <div className="bg-zinc-950/80 border border-zinc-800/60 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-wrap">
                    {message}
                  </div>
                </div>

                {resumeDriveLink && (
                  <div className="pt-2">
                    <a
                      href={resumeDriveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-xs font-semibold transition-all"
                    >
                      <FiFileText className="size-4" />
                      <span>View Submitted Resume (Drive Link)</span>
                    </a>
                  </div>
                )}
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer className="px-6 py-4 border-t border-zinc-900 flex justify-end bg-[#0c0c0e]">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default SeekerApplicationMessageModal;
