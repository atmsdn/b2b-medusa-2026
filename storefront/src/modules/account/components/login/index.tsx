import { login } from "@/lib/data/customer"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import ErrorMessage from "@/modules/checkout/components/error-message"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import { Checkbox, Text } from "@medusajs/ui"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-md w-full flex flex-col justify-center gap-8 my-auto"
      data-testid="login-page"
    >
      <div>
        <h1 className="text-3xl font-semibold text-enterprise-navy tracking-tight">
          Log in for faster checkout
        </h1>
        <Text className="text-enterprise-navy-muted text-sm mt-2">
          Access your account to manage orders, quotes, and company settings.
        </Text>
      </div>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
            className="border-enterprise-border focus:border-enterprise-accent"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
            className="border-enterprise-border focus:border-enterprise-accent"
          />
          <div className="flex items-center gap-2 pt-2">
            <Checkbox name="remember_me" data-testid="remember-me-checkbox" />
            <Text className="text-enterprise-navy-muted text-sm">
              Remember me
            </Text>
          </div>
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <div className="flex flex-col gap-3 mt-8">
          <SubmitButton data-testid="sign-in-button" className="w-full h-11">
            Log in
          </SubmitButton>
          <Button
            variant="secondary"
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="w-full h-11 border-enterprise-border hover:bg-enterprise-slate-soft text-enterprise-navy border"
            data-testid="register-button"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
