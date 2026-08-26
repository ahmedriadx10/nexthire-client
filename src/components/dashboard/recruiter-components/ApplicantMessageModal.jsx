"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { FiMessageSquare, FiX, FiUser, FiBriefcase } from "react-icons/fi";

/**
 * ApplicantMessageModal
 * Modal to display candidate cover message when recruiter clicks message icon.
 * Disabled if applicant did not provide a message.
 *
 * @param {{ message?: string, name?: string, jobName?: string, email?: string }} props
 */
const ApplicantMessageModal = ({ message, name = "Applicant", jobName, email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasMessage = Boolean(message && message.trim());

  if (!hasMessage) {
    return (
      <div
        title="No cover message provided"
        className="p-2 rounded-lg text-zinc-700 cursor-not-allowed select-none opacity-50"
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
        aria-label={`View cover message from ${name}`}
        className="p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200 cursor-pointer"
      >
        <FiMessageSquare className="size-4" />
      </button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-lg bg-[#0e0e10] border border-zinc-800/80 text-zinc-100 rounded-2xl shadow-2xl p-0 overflow-hidden relative max-h-[85vh] flex flex-col">
              {/* <Modal.CloseTrigger className="absolute right-4 top-4 text-zinc-400 hover:text-white cursor-pointer transition-colors p-1.5 rounded-lg hover:bg-zinc-900">
                <FiX className="size-4" />
              </Modal.CloseTrigger> */}

              {/* Header */}
              <Modal.Header className="px-6 pt-6 pb-4 border-b border-zinc-900 flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <FiMessageSquare className="size-5" />
                </div>
                <div>
                  <Modal.Heading className="text-lg font-bold text-white tracking-tight">
                    Cover Message
                  </Modal.Heading>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span className="flex items-center gap-1 font-medium text-zinc-300">
                      <FiUser className="size-3 text-zinc-500" />
                      {name}
                    </span>
                    {email && <span className="text-zinc-600">• {email}</span>}
                  </div>
                </div>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="px-6 py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
                {jobName && (
                  <div className="mb-4 inline-flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800 px-3 py-1 rounded-lg text-xs text-zinc-300">
                    <FiBriefcase className="size-3 text-primary" />
                    <span>Applied for: <strong className="text-white">{jobName}</strong></span>
                  </div>
                )}

                <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-wrap">
                  {message}
                </div>
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

export default ApplicantMessageModal;
