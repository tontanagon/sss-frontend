import { BookingStatus, style_status_class } from "@/lib/bookingStatus";
import { formatDateTimeToThai } from "@/lib/changeDateToThai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stepper({
  booking_status_histories,
}: {
  booking_status_histories: any;
}) {
  const currentStep = 0;

  return (
    <>
      {booking_status_histories.map((step: any, index: number) => {
        const status: BookingStatus = step.status;
        const current_styles = style_status_class[status];
        const isActive = index === 0;
        return (
          <ol
            key={index}
            className={`relative text-gray-500 ms-4 ${
              booking_status_histories.length > index + 1
                ? "border-s border-gray-200"
                : ""
            }`}
          >
            <li className={`ms-6 pb-10`}>
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white
                ${
                  isActive
                    ? ["incomplete", "reject", "overdue"].includes(step.status)
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-400"
                }
              `}
              >
                <FontAwesomeIcon icon={current_styles.sh_icon} />
              </span>
              <h3
                className={`font-medium text-sm leading-tight ${
                  isActive
                    ? ["incomplete", "reject", "overdue"].includes(step.status)
                      ? "text-red-600"
                      : "text-green-600"
                    : "text-gray-400"
                }`}
              >
                สถานะ : {current_styles.name_status}
                <br />
                {current_styles.sh_approve_by} : {step.approve_by}
                <br />
                {
                  step?.remark && (
                    <>
                    หมายเหตุ : {step.remark}
                    <br />
                    </>
                  )
                }
                {formatDateTimeToThai(step.created_at)}
              </h3>
            </li>
          </ol>
        );
      })}
    </>
  );
}
