import { z } from 'zod'

/* ❌ aaa, abcd, 1234, test */
const weakPattern = /^(.)\1+$|^(abcd|test|user|admin|password|123456)$/i

/* ✅ Proper email (blocks aaa@, 123@, abcd@) */
const strongEmail = z
  .string()
  .email('Invalid email format')
  .refine(
    (val) => {
      const local = val.split('@')[0]
      return (
        local.length > 3 &&
        !/^\d+$/.test(local) && // no only numbers
        !weakPattern.test(local)
      )
    },
    { message: 'Email looks too weak or fake' }
  )

/* ✅ Strong password */
const strongPassword = z
  .string()
  .min(8, 'Minimum 8 characters')
  .refine((val) => !weakPattern.test(val), {
    message: 'Password too common or repetitive',
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Must include an uppercase letter',
  })
  .refine((val) => /[a-z]/.test(val), {
    message: 'Must include a lowercase letter',
  })
  .refine((val) => /\d/.test(val), {
    message: 'Must include a number',
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: 'Must include a special character',
  })

/* 🔐 Login */
export const loginSchema = z.object({
  email: strongEmail,
  password: strongPassword,
})

/* 🧾 Register */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name too short')
    .refine((val) => !weakPattern.test(val), {
      message: 'Name looks invalid',
    }),

  email: strongEmail,

  password: strongPassword,

  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
