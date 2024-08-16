export default function SuccessScreen() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center">
        <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
        <h1 className="text-3xl font-bold">Email Verification Required</h1>
        <p className="text-gray-500 dark:text-gray-400">
          We've sent a verification email to your inbox. Please check your email and click the verification link to
          complete the sign-up process.
        </p>
      </div>
    </div>
  )
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}