import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','name','telegramChatId','telegramUsername','email','emailVerified','image','createdAt','updatedAt']);

export const TelegramPendingConnectionScalarFieldEnumSchema = z.enum(['id','userId','connectionToken','expiresAt','createdAt']);

export const SessionScalarFieldEnumSchema = z.enum(['id','expiresAt','token','createdAt','updatedAt','ipAddress','userAgent','userId']);

export const AccountScalarFieldEnumSchema = z.enum(['id','accountId','providerId','userId','accessToken','refreshToken','idToken','accessTokenExpiresAt','refreshTokenExpiresAt','scope','password','createdAt','updatedAt']);

export const VerificationScalarFieldEnumSchema = z.enum(['id','identifier','value','expiresAt','createdAt','updatedAt']);

export const ReceiptScalarFieldEnumSchema = z.enum(['id','name','date','amount','type','userId']);

export const ItemScalarFieldEnumSchema = z.enum(['id','name','weight','category','expiry','price','quantity','brand','isConsumed','receiptId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  telegramChatId: z.string().nullable(),
  telegramUsername: z.string().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// TELEGRAM PENDING CONNECTION SCHEMA
/////////////////////////////////////////

export const TelegramPendingConnectionSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  connectionToken: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export type TelegramPendingConnection = z.infer<typeof TelegramPendingConnectionSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
})

export type Verification = z.infer<typeof VerificationSchema>

/////////////////////////////////////////
// RECEIPT SCHEMA
/////////////////////////////////////////

export const ReceiptSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  type: z.string(),
  userId: z.string(),
})

export type Receipt = z.infer<typeof ReceiptSchema>

/////////////////////////////////////////
// ITEM SCHEMA
/////////////////////////////////////////

export const ItemSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  weight: z.string(),
  category: z.string(),
  expiry: z.coerce.date().nullable(),
  price: z.number(),
  quantity: z.number().int(),
  brand: z.string().nullable(),
  isConsumed: z.boolean().nullable(),
  receiptId: z.string(),
})

export type Item = z.infer<typeof ItemSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
  accounts: z.boolean().optional(),
  pendingConnections: z.boolean().optional(),
  Receipt: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  telegramChatId: z.boolean().optional(),
  telegramUsername: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  pendingConnections: z.union([z.boolean(),z.lazy(() => TelegramPendingConnectionArgsSchema)]).optional(),
  Receipt: z.union([z.boolean(),z.lazy(() => ReceiptArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TELEGRAM PENDING CONNECTION
//------------------------------------------------------

export const TelegramPendingConnectionIncludeSchema: z.ZodType<Prisma.TelegramPendingConnectionInclude> = z.object({
}).strict()

export const TelegramPendingConnectionArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionDefaultArgs> = z.object({
  select: z.lazy(() => TelegramPendingConnectionSelectSchema).optional(),
  include: z.lazy(() => TelegramPendingConnectionIncludeSchema).optional(),
}).strict();

export const TelegramPendingConnectionSelectSchema: z.ZodType<Prisma.TelegramPendingConnectionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  connectionToken: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  accountId: z.boolean().optional(),
  providerId: z.boolean().optional(),
  userId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  idToken: z.boolean().optional(),
  accessTokenExpiresAt: z.boolean().optional(),
  refreshTokenExpiresAt: z.boolean().optional(),
  scope: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION
//------------------------------------------------------

export const VerificationArgsSchema: z.ZodType<Prisma.VerificationDefaultArgs> = z.object({
  select: z.lazy(() => VerificationSelectSchema).optional(),
}).strict();

export const VerificationSelectSchema: z.ZodType<Prisma.VerificationSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  value: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// RECEIPT
//------------------------------------------------------

export const ReceiptIncludeSchema: z.ZodType<Prisma.ReceiptInclude> = z.object({
}).strict()

export const ReceiptArgsSchema: z.ZodType<Prisma.ReceiptDefaultArgs> = z.object({
  select: z.lazy(() => ReceiptSelectSchema).optional(),
  include: z.lazy(() => ReceiptIncludeSchema).optional(),
}).strict();

export const ReceiptCountOutputTypeArgsSchema: z.ZodType<Prisma.ReceiptCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ReceiptCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ReceiptCountOutputTypeSelectSchema: z.ZodType<Prisma.ReceiptCountOutputTypeSelect> = z.object({
  items: z.boolean().optional(),
}).strict();

export const ReceiptSelectSchema: z.ZodType<Prisma.ReceiptSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  date: z.boolean().optional(),
  amount: z.boolean().optional(),
  type: z.boolean().optional(),
  userId: z.boolean().optional(),
  items: z.union([z.boolean(),z.lazy(() => ItemArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReceiptCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ITEM
//------------------------------------------------------

export const ItemIncludeSchema: z.ZodType<Prisma.ItemInclude> = z.object({
}).strict()

export const ItemArgsSchema: z.ZodType<Prisma.ItemDefaultArgs> = z.object({
  select: z.lazy(() => ItemSelectSchema).optional(),
  include: z.lazy(() => ItemIncludeSchema).optional(),
}).strict();

export const ItemSelectSchema: z.ZodType<Prisma.ItemSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  weight: z.boolean().optional(),
  category: z.boolean().optional(),
  expiry: z.boolean().optional(),
  price: z.boolean().optional(),
  quantity: z.boolean().optional(),
  brand: z.boolean().optional(),
  isConsumed: z.boolean().optional(),
  receiptId: z.boolean().optional(),
  receipt: z.union([z.boolean(),z.lazy(() => ReceiptArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  telegramChatId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  telegramUsername: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionListRelationFilterSchema).optional(),
  Receipt: z.lazy(() => ReceiptListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  telegramChatId: z.lazy(() => SortOrderSchema).optional(),
  telegramUsername: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionOrderByRelationAggregateInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  telegramChatId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  telegramUsername: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionListRelationFilterSchema).optional(),
  Receipt: z.lazy(() => ReceiptListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  telegramChatId: z.lazy(() => SortOrderSchema).optional(),
  telegramUsername: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  telegramChatId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  telegramUsername: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TelegramPendingConnectionWhereInputSchema: z.ZodType<Prisma.TelegramPendingConnectionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TelegramPendingConnectionWhereInputSchema),z.lazy(() => TelegramPendingConnectionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TelegramPendingConnectionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TelegramPendingConnectionWhereInputSchema),z.lazy(() => TelegramPendingConnectionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  connectionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const TelegramPendingConnectionOrderByWithRelationInputSchema: z.ZodType<Prisma.TelegramPendingConnectionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  connectionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const TelegramPendingConnectionWhereUniqueInputSchema: z.ZodType<Prisma.TelegramPendingConnectionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TelegramPendingConnectionWhereInputSchema),z.lazy(() => TelegramPendingConnectionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TelegramPendingConnectionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TelegramPendingConnectionWhereInputSchema),z.lazy(() => TelegramPendingConnectionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  connectionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const TelegramPendingConnectionOrderByWithAggregationInputSchema: z.ZodType<Prisma.TelegramPendingConnectionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  connectionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TelegramPendingConnectionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TelegramPendingConnectionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TelegramPendingConnectionMinOrderByAggregateInputSchema).optional()
}).strict();

export const TelegramPendingConnectionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TelegramPendingConnectionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TelegramPendingConnectionScalarWhereWithAggregatesInputSchema),z.lazy(() => TelegramPendingConnectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TelegramPendingConnectionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TelegramPendingConnectionScalarWhereWithAggregatesInputSchema),z.lazy(() => TelegramPendingConnectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  connectionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationWhereInputSchema: z.ZodType<Prisma.VerificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationWhereUniqueInputSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ReceiptWhereInputSchema: z.ZodType<Prisma.ReceiptWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReceiptWhereInputSchema),z.lazy(() => ReceiptWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReceiptWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReceiptWhereInputSchema),z.lazy(() => ReceiptWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  items: z.lazy(() => ItemListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ReceiptOrderByWithRelationInputSchema: z.ZodType<Prisma.ReceiptOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  items: z.lazy(() => ItemOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ReceiptWhereUniqueInputSchema: z.ZodType<Prisma.ReceiptWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ReceiptWhereInputSchema),z.lazy(() => ReceiptWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReceiptWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReceiptWhereInputSchema),z.lazy(() => ReceiptWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  items: z.lazy(() => ItemListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ReceiptOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReceiptOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReceiptCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReceiptMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReceiptMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReceiptScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReceiptScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema),z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema),z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  amount: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ItemWhereInputSchema: z.ZodType<Prisma.ItemWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiry: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  brand: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isConsumed: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  receiptId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  receipt: z.union([ z.lazy(() => ReceiptScalarRelationFilterSchema),z.lazy(() => ReceiptWhereInputSchema) ]).optional(),
}).strict();

export const ItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  expiry: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  isConsumed: z.lazy(() => SortOrderSchema).optional(),
  receiptId: z.lazy(() => SortOrderSchema).optional(),
  receipt: z.lazy(() => ReceiptOrderByWithRelationInputSchema).optional()
}).strict();

export const ItemWhereUniqueInputSchema: z.ZodType<Prisma.ItemWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemWhereInputSchema),z.lazy(() => ItemWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiry: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  brand: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isConsumed: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  receiptId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  receipt: z.union([ z.lazy(() => ReceiptScalarRelationFilterSchema),z.lazy(() => ReceiptWhereInputSchema) ]).optional(),
}).strict());

export const ItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  expiry: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  isConsumed: z.lazy(() => SortOrderSchema).optional(),
  receiptId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ItemCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ItemAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ItemMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ItemSumOrderByAggregateInputSchema).optional()
}).strict();

export const ItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ItemScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiry: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  brand: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isConsumed: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  receiptId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionCreateNestedManyWithoutUserInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUpdateManyWithoutUserNestedInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TelegramPendingConnectionCreateInputSchema: z.ZodType<Prisma.TelegramPendingConnectionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  connectionToken: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPendingConnectionsInputSchema)
}).strict();

export const TelegramPendingConnectionUncheckedCreateInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  connectionToken: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const TelegramPendingConnectionUpdateInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUpdateInput> = z.object({
  connectionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPendingConnectionsNestedInputSchema).optional()
}).strict();

export const TelegramPendingConnectionUncheckedUpdateInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  connectionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TelegramPendingConnectionCreateManyInputSchema: z.ZodType<Prisma.TelegramPendingConnectionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  connectionToken: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const TelegramPendingConnectionUpdateManyMutationInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUpdateManyMutationInput> = z.object({
  connectionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TelegramPendingConnectionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  connectionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationCreateInputSchema: z.ZodType<Prisma.VerificationCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateInputSchema: z.ZodType<Prisma.VerificationUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReceiptCreateInputSchema: z.ZodType<Prisma.ReceiptCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  type: z.string(),
  items: z.lazy(() => ItemCreateNestedManyWithoutReceiptInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReceiptInputSchema)
}).strict();

export const ReceiptUncheckedCreateInputSchema: z.ZodType<Prisma.ReceiptUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  type: z.string(),
  userId: z.string(),
  items: z.lazy(() => ItemUncheckedCreateNestedManyWithoutReceiptInputSchema).optional()
}).strict();

export const ReceiptUpdateInputSchema: z.ZodType<Prisma.ReceiptUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => ItemUpdateManyWithoutReceiptNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReceiptNestedInputSchema).optional()
}).strict();

export const ReceiptUncheckedUpdateInputSchema: z.ZodType<Prisma.ReceiptUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => ItemUncheckedUpdateManyWithoutReceiptNestedInputSchema).optional()
}).strict();

export const ReceiptCreateManyInputSchema: z.ZodType<Prisma.ReceiptCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  type: z.string(),
  userId: z.string()
}).strict();

export const ReceiptUpdateManyMutationInputSchema: z.ZodType<Prisma.ReceiptUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReceiptUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReceiptUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemCreateInputSchema: z.ZodType<Prisma.ItemCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  weight: z.string(),
  category: z.string(),
  expiry: z.coerce.date().optional().nullable(),
  price: z.number(),
  quantity: z.number().int(),
  brand: z.string().optional().nullable(),
  isConsumed: z.boolean().optional().nullable(),
  receipt: z.lazy(() => ReceiptCreateNestedOneWithoutItemsInputSchema)
}).strict();

export const ItemUncheckedCreateInputSchema: z.ZodType<Prisma.ItemUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  weight: z.string(),
  category: z.string(),
  expiry: z.coerce.date().optional().nullable(),
  price: z.number(),
  quantity: z.number().int(),
  brand: z.string().optional().nullable(),
  isConsumed: z.boolean().optional().nullable(),
  receiptId: z.string()
}).strict();

export const ItemUpdateInputSchema: z.ZodType<Prisma.ItemUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiry: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isConsumed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.lazy(() => ReceiptUpdateOneRequiredWithoutItemsNestedInputSchema).optional()
}).strict();

export const ItemUncheckedUpdateInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiry: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isConsumed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receiptId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemCreateManyInputSchema: z.ZodType<Prisma.ItemCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  weight: z.string(),
  category: z.string(),
  expiry: z.coerce.date().optional().nullable(),
  price: z.number(),
  quantity: z.number().int(),
  brand: z.string().optional().nullable(),
  isConsumed: z.boolean().optional().nullable(),
  receiptId: z.string()
}).strict();

export const ItemUpdateManyMutationInputSchema: z.ZodType<Prisma.ItemUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiry: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isConsumed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiry: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isConsumed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receiptId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const TelegramPendingConnectionListRelationFilterSchema: z.ZodType<Prisma.TelegramPendingConnectionListRelationFilter> = z.object({
  every: z.lazy(() => TelegramPendingConnectionWhereInputSchema).optional(),
  some: z.lazy(() => TelegramPendingConnectionWhereInputSchema).optional(),
  none: z.lazy(() => TelegramPendingConnectionWhereInputSchema).optional()
}).strict();

export const ReceiptListRelationFilterSchema: z.ZodType<Prisma.ReceiptListRelationFilter> = z.object({
  every: z.lazy(() => ReceiptWhereInputSchema).optional(),
  some: z.lazy(() => ReceiptWhereInputSchema).optional(),
  none: z.lazy(() => ReceiptWhereInputSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TelegramPendingConnectionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TelegramPendingConnectionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReceiptOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReceiptOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  telegramChatId: z.lazy(() => SortOrderSchema).optional(),
  telegramUsername: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  telegramChatId: z.lazy(() => SortOrderSchema).optional(),
  telegramUsername: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  telegramChatId: z.lazy(() => SortOrderSchema).optional(),
  telegramUsername: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const TelegramPendingConnectionCountOrderByAggregateInputSchema: z.ZodType<Prisma.TelegramPendingConnectionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  connectionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TelegramPendingConnectionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TelegramPendingConnectionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  connectionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TelegramPendingConnectionMinOrderByAggregateInputSchema: z.ZodType<Prisma.TelegramPendingConnectionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  connectionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const VerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemListRelationFilterSchema: z.ZodType<Prisma.ItemListRelationFilter> = z.object({
  every: z.lazy(() => ItemWhereInputSchema).optional(),
  some: z.lazy(() => ItemWhereInputSchema).optional(),
  none: z.lazy(() => ItemWhereInputSchema).optional()
}).strict();

export const ItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ItemOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReceiptCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReceiptCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReceiptMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReceiptMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReceiptMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReceiptMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const ReceiptScalarRelationFilterSchema: z.ZodType<Prisma.ReceiptScalarRelationFilter> = z.object({
  is: z.lazy(() => ReceiptWhereInputSchema).optional(),
  isNot: z.lazy(() => ReceiptWhereInputSchema).optional()
}).strict();

export const ItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItemCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  expiry: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  isConsumed: z.lazy(() => SortOrderSchema).optional(),
  receiptId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ItemAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItemMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  expiry: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  isConsumed: z.lazy(() => SortOrderSchema).optional(),
  receiptId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItemMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  expiry: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  isConsumed: z.lazy(() => SortOrderSchema).optional(),
  receiptId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.ItemSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TelegramPendingConnectionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema).array(),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TelegramPendingConnectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TelegramPendingConnectionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReceiptCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReceiptCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReceiptCreateWithoutUserInputSchema),z.lazy(() => ReceiptCreateWithoutUserInputSchema).array(),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReceiptCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReceiptCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReceiptCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TelegramPendingConnectionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema).array(),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TelegramPendingConnectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TelegramPendingConnectionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReceiptUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReceiptUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReceiptCreateWithoutUserInputSchema),z.lazy(() => ReceiptCreateWithoutUserInputSchema).array(),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReceiptCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReceiptCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReceiptCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TelegramPendingConnectionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema).array(),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TelegramPendingConnectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TelegramPendingConnectionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TelegramPendingConnectionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TelegramPendingConnectionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TelegramPendingConnectionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema),z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReceiptUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReceiptUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReceiptCreateWithoutUserInputSchema),z.lazy(() => ReceiptCreateWithoutUserInputSchema).array(),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReceiptCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReceiptCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReceiptUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReceiptUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReceiptCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReceiptUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReceiptUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReceiptUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReceiptUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReceiptScalarWhereInputSchema),z.lazy(() => ReceiptScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TelegramPendingConnectionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema).array(),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TelegramPendingConnectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TelegramPendingConnectionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TelegramPendingConnectionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TelegramPendingConnectionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TelegramPendingConnectionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema),z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReceiptUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReceiptUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReceiptCreateWithoutUserInputSchema),z.lazy(() => ReceiptCreateWithoutUserInputSchema).array(),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReceiptCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReceiptCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReceiptUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReceiptUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReceiptCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReceiptWhereUniqueInputSchema),z.lazy(() => ReceiptWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReceiptUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReceiptUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReceiptUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReceiptUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReceiptScalarWhereInputSchema),z.lazy(() => ReceiptScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPendingConnectionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPendingConnectionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPendingConnectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPendingConnectionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPendingConnectionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPendingConnectionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPendingConnectionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPendingConnectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPendingConnectionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPendingConnectionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPendingConnectionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPendingConnectionsInputSchema),z.lazy(() => UserUpdateWithoutPendingConnectionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPendingConnectionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const ItemCreateNestedManyWithoutReceiptInputSchema: z.ZodType<Prisma.ItemCreateNestedManyWithoutReceiptInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutReceiptInputSchema),z.lazy(() => ItemCreateWithoutReceiptInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutReceiptInputSchema),z.lazy(() => ItemCreateOrConnectWithoutReceiptInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyReceiptInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReceiptInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReceiptInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReceiptInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceiptInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReceiptInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ItemUncheckedCreateNestedManyWithoutReceiptInputSchema: z.ZodType<Prisma.ItemUncheckedCreateNestedManyWithoutReceiptInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutReceiptInputSchema),z.lazy(() => ItemCreateWithoutReceiptInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutReceiptInputSchema),z.lazy(() => ItemCreateOrConnectWithoutReceiptInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyReceiptInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItemUpdateManyWithoutReceiptNestedInputSchema: z.ZodType<Prisma.ItemUpdateManyWithoutReceiptNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutReceiptInputSchema),z.lazy(() => ItemCreateWithoutReceiptInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutReceiptInputSchema),z.lazy(() => ItemCreateOrConnectWithoutReceiptInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemUpsertWithWhereUniqueWithoutReceiptInputSchema),z.lazy(() => ItemUpsertWithWhereUniqueWithoutReceiptInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyReceiptInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemUpdateWithWhereUniqueWithoutReceiptInputSchema),z.lazy(() => ItemUpdateWithWhereUniqueWithoutReceiptInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemUpdateManyWithWhereWithoutReceiptInputSchema),z.lazy(() => ItemUpdateManyWithWhereWithoutReceiptInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutReceiptNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReceiptNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReceiptInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceiptInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReceiptInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReceiptInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReceiptInputSchema),z.lazy(() => UserUpdateWithoutReceiptInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceiptInputSchema) ]).optional(),
}).strict();

export const ItemUncheckedUpdateManyWithoutReceiptNestedInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyWithoutReceiptNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemCreateWithoutReceiptInputSchema),z.lazy(() => ItemCreateWithoutReceiptInputSchema).array(),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemCreateOrConnectWithoutReceiptInputSchema),z.lazy(() => ItemCreateOrConnectWithoutReceiptInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemUpsertWithWhereUniqueWithoutReceiptInputSchema),z.lazy(() => ItemUpsertWithWhereUniqueWithoutReceiptInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemCreateManyReceiptInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemWhereUniqueInputSchema),z.lazy(() => ItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemUpdateWithWhereUniqueWithoutReceiptInputSchema),z.lazy(() => ItemUpdateWithWhereUniqueWithoutReceiptInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemUpdateManyWithWhereWithoutReceiptInputSchema),z.lazy(() => ItemUpdateManyWithWhereWithoutReceiptInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReceiptCreateNestedOneWithoutItemsInputSchema: z.ZodType<Prisma.ReceiptCreateNestedOneWithoutItemsInput> = z.object({
  create: z.union([ z.lazy(() => ReceiptCreateWithoutItemsInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReceiptCreateOrConnectWithoutItemsInputSchema).optional(),
  connect: z.lazy(() => ReceiptWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const ReceiptUpdateOneRequiredWithoutItemsNestedInputSchema: z.ZodType<Prisma.ReceiptUpdateOneRequiredWithoutItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReceiptCreateWithoutItemsInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReceiptCreateOrConnectWithoutItemsInputSchema).optional(),
  upsert: z.lazy(() => ReceiptUpsertWithoutItemsInputSchema).optional(),
  connect: z.lazy(() => ReceiptWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReceiptUpdateToOneWithWhereWithoutItemsInputSchema),z.lazy(() => ReceiptUpdateWithoutItemsInputSchema),z.lazy(() => ReceiptUncheckedUpdateWithoutItemsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
}).strict();

export const TelegramPendingConnectionCreateWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  connectionToken: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  connectionToken: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const TelegramPendingConnectionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TelegramPendingConnectionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TelegramPendingConnectionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TelegramPendingConnectionCreateManyUserInputSchema),z.lazy(() => TelegramPendingConnectionCreateManyUserInputSchema).array() ]),
}).strict();

export const ReceiptCreateWithoutUserInputSchema: z.ZodType<Prisma.ReceiptCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  type: z.string(),
  items: z.lazy(() => ItemCreateNestedManyWithoutReceiptInputSchema).optional()
}).strict();

export const ReceiptUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReceiptUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  type: z.string(),
  items: z.lazy(() => ItemUncheckedCreateNestedManyWithoutReceiptInputSchema).optional()
}).strict();

export const ReceiptCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReceiptCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReceiptWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReceiptCreateWithoutUserInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReceiptCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReceiptCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReceiptCreateManyUserInputSchema),z.lazy(() => ReceiptCreateManyUserInputSchema).array() ]),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TelegramPendingConnectionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TelegramPendingConnectionUpdateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TelegramPendingConnectionCreateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TelegramPendingConnectionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TelegramPendingConnectionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TelegramPendingConnectionUpdateWithoutUserInputSchema),z.lazy(() => TelegramPendingConnectionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TelegramPendingConnectionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TelegramPendingConnectionUpdateManyMutationInputSchema),z.lazy(() => TelegramPendingConnectionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TelegramPendingConnectionScalarWhereInputSchema: z.ZodType<Prisma.TelegramPendingConnectionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema),z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema),z.lazy(() => TelegramPendingConnectionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  connectionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReceiptUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReceiptUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReceiptWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReceiptUpdateWithoutUserInputSchema),z.lazy(() => ReceiptUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReceiptCreateWithoutUserInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReceiptUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReceiptUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReceiptWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReceiptUpdateWithoutUserInputSchema),z.lazy(() => ReceiptUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ReceiptUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReceiptUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReceiptScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReceiptUpdateManyMutationInputSchema),z.lazy(() => ReceiptUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ReceiptScalarWhereInputSchema: z.ZodType<Prisma.ReceiptScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReceiptScalarWhereInputSchema),z.lazy(() => ReceiptScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReceiptScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReceiptScalarWhereInputSchema),z.lazy(() => ReceiptScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amount: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutPendingConnectionsInputSchema: z.ZodType<Prisma.UserCreateWithoutPendingConnectionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPendingConnectionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPendingConnectionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPendingConnectionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPendingConnectionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPendingConnectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPendingConnectionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutPendingConnectionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPendingConnectionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPendingConnectionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPendingConnectionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPendingConnectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPendingConnectionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPendingConnectionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPendingConnectionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPendingConnectionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPendingConnectionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPendingConnectionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPendingConnectionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPendingConnectionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPendingConnectionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionCreateNestedManyWithoutUserInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUpdateManyWithoutUserNestedInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionCreateNestedManyWithoutUserInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUpdateManyWithoutUserNestedInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Receipt: z.lazy(() => ReceiptUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ItemCreateWithoutReceiptInputSchema: z.ZodType<Prisma.ItemCreateWithoutReceiptInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  weight: z.string(),
  category: z.string(),
  expiry: z.coerce.date().optional().nullable(),
  price: z.number(),
  quantity: z.number().int(),
  brand: z.string().optional().nullable(),
  isConsumed: z.boolean().optional().nullable()
}).strict();

export const ItemUncheckedCreateWithoutReceiptInputSchema: z.ZodType<Prisma.ItemUncheckedCreateWithoutReceiptInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  weight: z.string(),
  category: z.string(),
  expiry: z.coerce.date().optional().nullable(),
  price: z.number(),
  quantity: z.number().int(),
  brand: z.string().optional().nullable(),
  isConsumed: z.boolean().optional().nullable()
}).strict();

export const ItemCreateOrConnectWithoutReceiptInputSchema: z.ZodType<Prisma.ItemCreateOrConnectWithoutReceiptInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItemCreateWithoutReceiptInputSchema),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema) ]),
}).strict();

export const ItemCreateManyReceiptInputEnvelopeSchema: z.ZodType<Prisma.ItemCreateManyReceiptInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ItemCreateManyReceiptInputSchema),z.lazy(() => ItemCreateManyReceiptInputSchema).array() ]),
}).strict();

export const UserCreateWithoutReceiptInputSchema: z.ZodType<Prisma.UserCreateWithoutReceiptInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReceiptInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReceiptInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  telegramChatId: z.string().optional().nullable(),
  telegramUsername: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReceiptInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReceiptInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReceiptInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceiptInputSchema) ]),
}).strict();

export const ItemUpsertWithWhereUniqueWithoutReceiptInputSchema: z.ZodType<Prisma.ItemUpsertWithWhereUniqueWithoutReceiptInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ItemUpdateWithoutReceiptInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutReceiptInputSchema) ]),
  create: z.union([ z.lazy(() => ItemCreateWithoutReceiptInputSchema),z.lazy(() => ItemUncheckedCreateWithoutReceiptInputSchema) ]),
}).strict();

export const ItemUpdateWithWhereUniqueWithoutReceiptInputSchema: z.ZodType<Prisma.ItemUpdateWithWhereUniqueWithoutReceiptInput> = z.object({
  where: z.lazy(() => ItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ItemUpdateWithoutReceiptInputSchema),z.lazy(() => ItemUncheckedUpdateWithoutReceiptInputSchema) ]),
}).strict();

export const ItemUpdateManyWithWhereWithoutReceiptInputSchema: z.ZodType<Prisma.ItemUpdateManyWithWhereWithoutReceiptInput> = z.object({
  where: z.lazy(() => ItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ItemUpdateManyMutationInputSchema),z.lazy(() => ItemUncheckedUpdateManyWithoutReceiptInputSchema) ]),
}).strict();

export const ItemScalarWhereInputSchema: z.ZodType<Prisma.ItemScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemScalarWhereInputSchema),z.lazy(() => ItemScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiry: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  brand: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isConsumed: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  receiptId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserUpsertWithoutReceiptInputSchema: z.ZodType<Prisma.UserUpsertWithoutReceiptInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReceiptInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceiptInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReceiptInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceiptInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReceiptInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReceiptInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReceiptInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceiptInputSchema) ]),
}).strict();

export const UserUpdateWithoutReceiptInputSchema: z.ZodType<Prisma.UserUpdateWithoutReceiptInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReceiptInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReceiptInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  telegramChatId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telegramUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  pendingConnections: z.lazy(() => TelegramPendingConnectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ReceiptCreateWithoutItemsInputSchema: z.ZodType<Prisma.ReceiptCreateWithoutItemsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  type: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutReceiptInputSchema)
}).strict();

export const ReceiptUncheckedCreateWithoutItemsInputSchema: z.ZodType<Prisma.ReceiptUncheckedCreateWithoutItemsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  type: z.string(),
  userId: z.string()
}).strict();

export const ReceiptCreateOrConnectWithoutItemsInputSchema: z.ZodType<Prisma.ReceiptCreateOrConnectWithoutItemsInput> = z.object({
  where: z.lazy(() => ReceiptWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReceiptCreateWithoutItemsInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutItemsInputSchema) ]),
}).strict();

export const ReceiptUpsertWithoutItemsInputSchema: z.ZodType<Prisma.ReceiptUpsertWithoutItemsInput> = z.object({
  update: z.union([ z.lazy(() => ReceiptUpdateWithoutItemsInputSchema),z.lazy(() => ReceiptUncheckedUpdateWithoutItemsInputSchema) ]),
  create: z.union([ z.lazy(() => ReceiptCreateWithoutItemsInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutItemsInputSchema) ]),
  where: z.lazy(() => ReceiptWhereInputSchema).optional()
}).strict();

export const ReceiptUpdateToOneWithWhereWithoutItemsInputSchema: z.ZodType<Prisma.ReceiptUpdateToOneWithWhereWithoutItemsInput> = z.object({
  where: z.lazy(() => ReceiptWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ReceiptUpdateWithoutItemsInputSchema),z.lazy(() => ReceiptUncheckedUpdateWithoutItemsInputSchema) ]),
}).strict();

export const ReceiptUpdateWithoutItemsInputSchema: z.ZodType<Prisma.ReceiptUpdateWithoutItemsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReceiptNestedInputSchema).optional()
}).strict();

export const ReceiptUncheckedUpdateWithoutItemsInputSchema: z.ZodType<Prisma.ReceiptUncheckedUpdateWithoutItemsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const TelegramPendingConnectionCreateManyUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  connectionToken: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ReceiptCreateManyUserInputSchema: z.ZodType<Prisma.ReceiptCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  date: z.coerce.date(),
  amount: z.string(),
  type: z.string()
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TelegramPendingConnectionUpdateWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUpdateWithoutUserInput> = z.object({
  connectionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TelegramPendingConnectionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUncheckedUpdateWithoutUserInput> = z.object({
  connectionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TelegramPendingConnectionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TelegramPendingConnectionUncheckedUpdateManyWithoutUserInput> = z.object({
  connectionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReceiptUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReceiptUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => ItemUpdateManyWithoutReceiptNestedInputSchema).optional()
}).strict();

export const ReceiptUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReceiptUncheckedUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => ItemUncheckedUpdateManyWithoutReceiptNestedInputSchema).optional()
}).strict();

export const ReceiptUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReceiptUncheckedUpdateManyWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemCreateManyReceiptInputSchema: z.ZodType<Prisma.ItemCreateManyReceiptInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  weight: z.string(),
  category: z.string(),
  expiry: z.coerce.date().optional().nullable(),
  price: z.number(),
  quantity: z.number().int(),
  brand: z.string().optional().nullable(),
  isConsumed: z.boolean().optional().nullable()
}).strict();

export const ItemUpdateWithoutReceiptInputSchema: z.ZodType<Prisma.ItemUpdateWithoutReceiptInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiry: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isConsumed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemUncheckedUpdateWithoutReceiptInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateWithoutReceiptInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiry: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isConsumed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemUncheckedUpdateManyWithoutReceiptInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyWithoutReceiptInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiry: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isConsumed: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const TelegramPendingConnectionFindFirstArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionFindFirstArgs> = z.object({
  select: TelegramPendingConnectionSelectSchema.optional(),
  include: TelegramPendingConnectionIncludeSchema.optional(),
  where: TelegramPendingConnectionWhereInputSchema.optional(),
  orderBy: z.union([ TelegramPendingConnectionOrderByWithRelationInputSchema.array(),TelegramPendingConnectionOrderByWithRelationInputSchema ]).optional(),
  cursor: TelegramPendingConnectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TelegramPendingConnectionScalarFieldEnumSchema,TelegramPendingConnectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TelegramPendingConnectionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionFindFirstOrThrowArgs> = z.object({
  select: TelegramPendingConnectionSelectSchema.optional(),
  include: TelegramPendingConnectionIncludeSchema.optional(),
  where: TelegramPendingConnectionWhereInputSchema.optional(),
  orderBy: z.union([ TelegramPendingConnectionOrderByWithRelationInputSchema.array(),TelegramPendingConnectionOrderByWithRelationInputSchema ]).optional(),
  cursor: TelegramPendingConnectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TelegramPendingConnectionScalarFieldEnumSchema,TelegramPendingConnectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TelegramPendingConnectionFindManyArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionFindManyArgs> = z.object({
  select: TelegramPendingConnectionSelectSchema.optional(),
  include: TelegramPendingConnectionIncludeSchema.optional(),
  where: TelegramPendingConnectionWhereInputSchema.optional(),
  orderBy: z.union([ TelegramPendingConnectionOrderByWithRelationInputSchema.array(),TelegramPendingConnectionOrderByWithRelationInputSchema ]).optional(),
  cursor: TelegramPendingConnectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TelegramPendingConnectionScalarFieldEnumSchema,TelegramPendingConnectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TelegramPendingConnectionAggregateArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionAggregateArgs> = z.object({
  where: TelegramPendingConnectionWhereInputSchema.optional(),
  orderBy: z.union([ TelegramPendingConnectionOrderByWithRelationInputSchema.array(),TelegramPendingConnectionOrderByWithRelationInputSchema ]).optional(),
  cursor: TelegramPendingConnectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TelegramPendingConnectionGroupByArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionGroupByArgs> = z.object({
  where: TelegramPendingConnectionWhereInputSchema.optional(),
  orderBy: z.union([ TelegramPendingConnectionOrderByWithAggregationInputSchema.array(),TelegramPendingConnectionOrderByWithAggregationInputSchema ]).optional(),
  by: TelegramPendingConnectionScalarFieldEnumSchema.array(),
  having: TelegramPendingConnectionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TelegramPendingConnectionFindUniqueArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionFindUniqueArgs> = z.object({
  select: TelegramPendingConnectionSelectSchema.optional(),
  include: TelegramPendingConnectionIncludeSchema.optional(),
  where: TelegramPendingConnectionWhereUniqueInputSchema,
}).strict() ;

export const TelegramPendingConnectionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionFindUniqueOrThrowArgs> = z.object({
  select: TelegramPendingConnectionSelectSchema.optional(),
  include: TelegramPendingConnectionIncludeSchema.optional(),
  where: TelegramPendingConnectionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindFirstArgsSchema: z.ZodType<Prisma.VerificationFindFirstArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindFirstOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindManyArgsSchema: z.ZodType<Prisma.VerificationFindManyArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationAggregateArgsSchema: z.ZodType<Prisma.VerificationAggregateArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationGroupByArgsSchema: z.ZodType<Prisma.VerificationGroupByArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithAggregationInputSchema.array(),VerificationOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationScalarFieldEnumSchema.array(),
  having: VerificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationFindUniqueArgsSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindUniqueOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const ReceiptFindFirstArgsSchema: z.ZodType<Prisma.ReceiptFindFirstArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithRelationInputSchema.array(),ReceiptOrderByWithRelationInputSchema ]).optional(),
  cursor: ReceiptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReceiptScalarFieldEnumSchema,ReceiptScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReceiptFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReceiptFindFirstOrThrowArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithRelationInputSchema.array(),ReceiptOrderByWithRelationInputSchema ]).optional(),
  cursor: ReceiptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReceiptScalarFieldEnumSchema,ReceiptScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReceiptFindManyArgsSchema: z.ZodType<Prisma.ReceiptFindManyArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithRelationInputSchema.array(),ReceiptOrderByWithRelationInputSchema ]).optional(),
  cursor: ReceiptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReceiptScalarFieldEnumSchema,ReceiptScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReceiptAggregateArgsSchema: z.ZodType<Prisma.ReceiptAggregateArgs> = z.object({
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithRelationInputSchema.array(),ReceiptOrderByWithRelationInputSchema ]).optional(),
  cursor: ReceiptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReceiptGroupByArgsSchema: z.ZodType<Prisma.ReceiptGroupByArgs> = z.object({
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithAggregationInputSchema.array(),ReceiptOrderByWithAggregationInputSchema ]).optional(),
  by: ReceiptScalarFieldEnumSchema.array(),
  having: ReceiptScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReceiptFindUniqueArgsSchema: z.ZodType<Prisma.ReceiptFindUniqueArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereUniqueInputSchema,
}).strict() ;

export const ReceiptFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReceiptFindUniqueOrThrowArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereUniqueInputSchema,
}).strict() ;

export const ItemFindFirstArgsSchema: z.ZodType<Prisma.ItemFindFirstArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemScalarFieldEnumSchema,ItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItemFindFirstOrThrowArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemScalarFieldEnumSchema,ItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemFindManyArgsSchema: z.ZodType<Prisma.ItemFindManyArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemScalarFieldEnumSchema,ItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemAggregateArgsSchema: z.ZodType<Prisma.ItemAggregateArgs> = z.object({
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithRelationInputSchema.array(),ItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemGroupByArgsSchema: z.ZodType<Prisma.ItemGroupByArgs> = z.object({
  where: ItemWhereInputSchema.optional(),
  orderBy: z.union([ ItemOrderByWithAggregationInputSchema.array(),ItemOrderByWithAggregationInputSchema ]).optional(),
  by: ItemScalarFieldEnumSchema.array(),
  having: ItemScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemFindUniqueArgsSchema: z.ZodType<Prisma.ItemFindUniqueArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const ItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItemFindUniqueOrThrowArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TelegramPendingConnectionCreateArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionCreateArgs> = z.object({
  select: TelegramPendingConnectionSelectSchema.optional(),
  include: TelegramPendingConnectionIncludeSchema.optional(),
  data: z.union([ TelegramPendingConnectionCreateInputSchema,TelegramPendingConnectionUncheckedCreateInputSchema ]),
}).strict() ;

export const TelegramPendingConnectionUpsertArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionUpsertArgs> = z.object({
  select: TelegramPendingConnectionSelectSchema.optional(),
  include: TelegramPendingConnectionIncludeSchema.optional(),
  where: TelegramPendingConnectionWhereUniqueInputSchema,
  create: z.union([ TelegramPendingConnectionCreateInputSchema,TelegramPendingConnectionUncheckedCreateInputSchema ]),
  update: z.union([ TelegramPendingConnectionUpdateInputSchema,TelegramPendingConnectionUncheckedUpdateInputSchema ]),
}).strict() ;

export const TelegramPendingConnectionCreateManyArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionCreateManyArgs> = z.object({
  data: z.union([ TelegramPendingConnectionCreateManyInputSchema,TelegramPendingConnectionCreateManyInputSchema.array() ]),
}).strict() ;

export const TelegramPendingConnectionDeleteArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionDeleteArgs> = z.object({
  select: TelegramPendingConnectionSelectSchema.optional(),
  include: TelegramPendingConnectionIncludeSchema.optional(),
  where: TelegramPendingConnectionWhereUniqueInputSchema,
}).strict() ;

export const TelegramPendingConnectionUpdateArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionUpdateArgs> = z.object({
  select: TelegramPendingConnectionSelectSchema.optional(),
  include: TelegramPendingConnectionIncludeSchema.optional(),
  data: z.union([ TelegramPendingConnectionUpdateInputSchema,TelegramPendingConnectionUncheckedUpdateInputSchema ]),
  where: TelegramPendingConnectionWhereUniqueInputSchema,
}).strict() ;

export const TelegramPendingConnectionUpdateManyArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionUpdateManyArgs> = z.object({
  data: z.union([ TelegramPendingConnectionUpdateManyMutationInputSchema,TelegramPendingConnectionUncheckedUpdateManyInputSchema ]),
  where: TelegramPendingConnectionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TelegramPendingConnectionDeleteManyArgsSchema: z.ZodType<Prisma.TelegramPendingConnectionDeleteManyArgs> = z.object({
  where: TelegramPendingConnectionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationCreateArgsSchema: z.ZodType<Prisma.VerificationCreateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationUpsertArgsSchema: z.ZodType<Prisma.VerificationUpsertArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
  create: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
  update: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
}).strict() ;

export const VerificationDeleteArgsSchema: z.ZodType<Prisma.VerificationDeleteArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateArgsSchema: z.ZodType<Prisma.VerificationUpdateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationDeleteManyArgsSchema: z.ZodType<Prisma.VerificationDeleteManyArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReceiptCreateArgsSchema: z.ZodType<Prisma.ReceiptCreateArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  data: z.union([ ReceiptCreateInputSchema,ReceiptUncheckedCreateInputSchema ]),
}).strict() ;

export const ReceiptUpsertArgsSchema: z.ZodType<Prisma.ReceiptUpsertArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereUniqueInputSchema,
  create: z.union([ ReceiptCreateInputSchema,ReceiptUncheckedCreateInputSchema ]),
  update: z.union([ ReceiptUpdateInputSchema,ReceiptUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReceiptCreateManyArgsSchema: z.ZodType<Prisma.ReceiptCreateManyArgs> = z.object({
  data: z.union([ ReceiptCreateManyInputSchema,ReceiptCreateManyInputSchema.array() ]),
}).strict() ;

export const ReceiptDeleteArgsSchema: z.ZodType<Prisma.ReceiptDeleteArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereUniqueInputSchema,
}).strict() ;

export const ReceiptUpdateArgsSchema: z.ZodType<Prisma.ReceiptUpdateArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  data: z.union([ ReceiptUpdateInputSchema,ReceiptUncheckedUpdateInputSchema ]),
  where: ReceiptWhereUniqueInputSchema,
}).strict() ;

export const ReceiptUpdateManyArgsSchema: z.ZodType<Prisma.ReceiptUpdateManyArgs> = z.object({
  data: z.union([ ReceiptUpdateManyMutationInputSchema,ReceiptUncheckedUpdateManyInputSchema ]),
  where: ReceiptWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReceiptDeleteManyArgsSchema: z.ZodType<Prisma.ReceiptDeleteManyArgs> = z.object({
  where: ReceiptWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItemCreateArgsSchema: z.ZodType<Prisma.ItemCreateArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  data: z.union([ ItemCreateInputSchema,ItemUncheckedCreateInputSchema ]),
}).strict() ;

export const ItemUpsertArgsSchema: z.ZodType<Prisma.ItemUpsertArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereUniqueInputSchema,
  create: z.union([ ItemCreateInputSchema,ItemUncheckedCreateInputSchema ]),
  update: z.union([ ItemUpdateInputSchema,ItemUncheckedUpdateInputSchema ]),
}).strict() ;

export const ItemCreateManyArgsSchema: z.ZodType<Prisma.ItemCreateManyArgs> = z.object({
  data: z.union([ ItemCreateManyInputSchema,ItemCreateManyInputSchema.array() ]),
}).strict() ;

export const ItemDeleteArgsSchema: z.ZodType<Prisma.ItemDeleteArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const ItemUpdateArgsSchema: z.ZodType<Prisma.ItemUpdateArgs> = z.object({
  select: ItemSelectSchema.optional(),
  include: ItemIncludeSchema.optional(),
  data: z.union([ ItemUpdateInputSchema,ItemUncheckedUpdateInputSchema ]),
  where: ItemWhereUniqueInputSchema,
}).strict() ;

export const ItemUpdateManyArgsSchema: z.ZodType<Prisma.ItemUpdateManyArgs> = z.object({
  data: z.union([ ItemUpdateManyMutationInputSchema,ItemUncheckedUpdateManyInputSchema ]),
  where: ItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItemDeleteManyArgsSchema: z.ZodType<Prisma.ItemDeleteManyArgs> = z.object({
  where: ItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;