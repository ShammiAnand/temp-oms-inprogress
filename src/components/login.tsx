import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useActionData,
  useNavigation,
  Form as RouterForm,
} from "react-router-dom";

export function Login() {
  const actionData = useActionData() as { error?: string };
  const navigation = useNavigation();

  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, {
        message: "password must be at least 6 chars long",
      })
      .max(50, {
        message: "password must be at most 50 chars",
      }),
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <RouterForm method="post" className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {actionData?.error && (
            <div className="text-sm font-medium text-destructive">
              {actionData.error}
            </div>
          )}
          <Button type="submit" disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Logging in..." : "Log in"}
          </Button>
        </RouterForm>
      </Form>
    </div>
  );
}
