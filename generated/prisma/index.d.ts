
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Driver
 * 
 */
export type Driver = $Result.DefaultSelection<Prisma.$DriverPayload>
/**
 * Model Passenger
 * 
 */
export type Passenger = $Result.DefaultSelection<Prisma.$PassengerPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model Ride
 * 
 */
export type Ride = $Result.DefaultSelection<Prisma.$RidePayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Rating
 * 
 */
export type Rating = $Result.DefaultSelection<Prisma.$RatingPayload>
/**
 * Model RideLocation
 * 
 */
export type RideLocation = $Result.DefaultSelection<Prisma.$RideLocationPayload>
/**
 * Model DriverDocument
 * 
 */
export type DriverDocument = $Result.DefaultSelection<Prisma.$DriverDocumentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  PREFER_NOT_TO_SAY: 'PREFER_NOT_TO_SAY'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const Status: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  SUSPENDED: 'SUSPENDED'
};

export type Status = (typeof Status)[keyof typeof Status]


export const VehicleType: {
  ECONOMY: 'ECONOMY',
  COMFORT: 'COMFORT',
  LUXURY: 'LUXURY',
  SUV: 'SUV',
  VAN: 'VAN'
};

export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType]


export const RideStatus: {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const RideType: {
  STANDARD: 'STANDARD',
  SCHEDULED: 'SCHEDULED',
  SHARED: 'SHARED'
};

export type RideType = (typeof RideType)[keyof typeof RideType]


export const UserType: {
  DRIVER: 'DRIVER',
  PASSENGER: 'PASSENGER'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const DocumentType: {
  DRIVERS_LICENSE: 'DRIVERS_LICENSE',
  VEHICLE_REGISTRATION: 'VEHICLE_REGISTRATION',
  VEHICLE_INSURANCE: 'VEHICLE_INSURANCE',
  BACKGROUND_CHECK: 'BACKGROUND_CHECK',
  PROFILE_PHOTO: 'PROFILE_PHOTO',
  OTHER: 'OTHER'
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type VehicleType = $Enums.VehicleType

export const VehicleType: typeof $Enums.VehicleType

export type RideStatus = $Enums.RideStatus

export const RideStatus: typeof $Enums.RideStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type RideType = $Enums.RideType

export const RideType: typeof $Enums.RideType

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type DocumentType = $Enums.DocumentType

export const DocumentType: typeof $Enums.DocumentType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.driver`: Exposes CRUD operations for the **Driver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.driver.findMany()
    * ```
    */
  get driver(): Prisma.DriverDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passenger`: Exposes CRUD operations for the **Passenger** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Passengers
    * const passengers = await prisma.passenger.findMany()
    * ```
    */
  get passenger(): Prisma.PassengerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ride`: Exposes CRUD operations for the **Ride** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rides
    * const rides = await prisma.ride.findMany()
    * ```
    */
  get ride(): Prisma.RideDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rating`: Exposes CRUD operations for the **Rating** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ratings
    * const ratings = await prisma.rating.findMany()
    * ```
    */
  get rating(): Prisma.RatingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rideLocation`: Exposes CRUD operations for the **RideLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RideLocations
    * const rideLocations = await prisma.rideLocation.findMany()
    * ```
    */
  get rideLocation(): Prisma.RideLocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.driverDocument`: Exposes CRUD operations for the **DriverDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DriverDocuments
    * const driverDocuments = await prisma.driverDocument.findMany()
    * ```
    */
  get driverDocument(): Prisma.DriverDocumentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Driver: 'Driver',
    Passenger: 'Passenger',
    Vehicle: 'Vehicle',
    Ride: 'Ride',
    Payment: 'Payment',
    Rating: 'Rating',
    RideLocation: 'RideLocation',
    DriverDocument: 'DriverDocument'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "driver" | "passenger" | "vehicle" | "ride" | "payment" | "rating" | "rideLocation" | "driverDocument"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Driver: {
        payload: Prisma.$DriverPayload<ExtArgs>
        fields: Prisma.DriverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findFirst: {
            args: Prisma.DriverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findMany: {
            args: Prisma.DriverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          create: {
            args: Prisma.DriverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          createMany: {
            args: Prisma.DriverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          delete: {
            args: Prisma.DriverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          update: {
            args: Prisma.DriverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          deleteMany: {
            args: Prisma.DriverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriverUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          upsert: {
            args: Prisma.DriverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          aggregate: {
            args: Prisma.DriverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriver>
          }
          groupBy: {
            args: Prisma.DriverGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverCountArgs<ExtArgs>
            result: $Utils.Optional<DriverCountAggregateOutputType> | number
          }
        }
      }
      Passenger: {
        payload: Prisma.$PassengerPayload<ExtArgs>
        fields: Prisma.PassengerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PassengerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PassengerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          findFirst: {
            args: Prisma.PassengerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PassengerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          findMany: {
            args: Prisma.PassengerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>[]
          }
          create: {
            args: Prisma.PassengerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          createMany: {
            args: Prisma.PassengerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PassengerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>[]
          }
          delete: {
            args: Prisma.PassengerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          update: {
            args: Prisma.PassengerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          deleteMany: {
            args: Prisma.PassengerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PassengerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PassengerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>[]
          }
          upsert: {
            args: Prisma.PassengerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          aggregate: {
            args: Prisma.PassengerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePassenger>
          }
          groupBy: {
            args: Prisma.PassengerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PassengerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PassengerCountArgs<ExtArgs>
            result: $Utils.Optional<PassengerCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      Ride: {
        payload: Prisma.$RidePayload<ExtArgs>
        fields: Prisma.RideFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RideFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RideFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          findFirst: {
            args: Prisma.RideFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RideFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          findMany: {
            args: Prisma.RideFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>[]
          }
          create: {
            args: Prisma.RideCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          createMany: {
            args: Prisma.RideCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RideCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>[]
          }
          delete: {
            args: Prisma.RideDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          update: {
            args: Prisma.RideUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          deleteMany: {
            args: Prisma.RideDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RideUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RideUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>[]
          }
          upsert: {
            args: Prisma.RideUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          aggregate: {
            args: Prisma.RideAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRide>
          }
          groupBy: {
            args: Prisma.RideGroupByArgs<ExtArgs>
            result: $Utils.Optional<RideGroupByOutputType>[]
          }
          count: {
            args: Prisma.RideCountArgs<ExtArgs>
            result: $Utils.Optional<RideCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Rating: {
        payload: Prisma.$RatingPayload<ExtArgs>
        fields: Prisma.RatingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RatingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RatingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findFirst: {
            args: Prisma.RatingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RatingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findMany: {
            args: Prisma.RatingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          create: {
            args: Prisma.RatingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          createMany: {
            args: Prisma.RatingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RatingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          delete: {
            args: Prisma.RatingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          update: {
            args: Prisma.RatingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          deleteMany: {
            args: Prisma.RatingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RatingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RatingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          upsert: {
            args: Prisma.RatingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          aggregate: {
            args: Prisma.RatingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRating>
          }
          groupBy: {
            args: Prisma.RatingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RatingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RatingCountArgs<ExtArgs>
            result: $Utils.Optional<RatingCountAggregateOutputType> | number
          }
        }
      }
      RideLocation: {
        payload: Prisma.$RideLocationPayload<ExtArgs>
        fields: Prisma.RideLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RideLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RideLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload>
          }
          findFirst: {
            args: Prisma.RideLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RideLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload>
          }
          findMany: {
            args: Prisma.RideLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload>[]
          }
          create: {
            args: Prisma.RideLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload>
          }
          createMany: {
            args: Prisma.RideLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RideLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload>[]
          }
          delete: {
            args: Prisma.RideLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload>
          }
          update: {
            args: Prisma.RideLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload>
          }
          deleteMany: {
            args: Prisma.RideLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RideLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RideLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload>[]
          }
          upsert: {
            args: Prisma.RideLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideLocationPayload>
          }
          aggregate: {
            args: Prisma.RideLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRideLocation>
          }
          groupBy: {
            args: Prisma.RideLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RideLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RideLocationCountArgs<ExtArgs>
            result: $Utils.Optional<RideLocationCountAggregateOutputType> | number
          }
        }
      }
      DriverDocument: {
        payload: Prisma.$DriverDocumentPayload<ExtArgs>
        fields: Prisma.DriverDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload>
          }
          findFirst: {
            args: Prisma.DriverDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload>
          }
          findMany: {
            args: Prisma.DriverDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload>[]
          }
          create: {
            args: Prisma.DriverDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload>
          }
          createMany: {
            args: Prisma.DriverDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload>[]
          }
          delete: {
            args: Prisma.DriverDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload>
          }
          update: {
            args: Prisma.DriverDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload>
          }
          deleteMany: {
            args: Prisma.DriverDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriverDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload>[]
          }
          upsert: {
            args: Prisma.DriverDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverDocumentPayload>
          }
          aggregate: {
            args: Prisma.DriverDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriverDocument>
          }
          groupBy: {
            args: Prisma.DriverDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DriverDocumentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    driver?: DriverOmit
    passenger?: PassengerOmit
    vehicle?: VehicleOmit
    ride?: RideOmit
    payment?: PaymentOmit
    rating?: RatingOmit
    rideLocation?: RideLocationOmit
    driverDocument?: DriverDocumentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ratings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | UserCountOutputTypeCountRatingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }


  /**
   * Count Type DriverCountOutputType
   */

  export type DriverCountOutputType = {
    rides: number
    documents: number
  }

  export type DriverCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rides?: boolean | DriverCountOutputTypeCountRidesArgs
    documents?: boolean | DriverCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverCountOutputType
     */
    select?: DriverCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeCountRidesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideWhereInput
  }

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverDocumentWhereInput
  }


  /**
   * Count Type PassengerCountOutputType
   */

  export type PassengerCountOutputType = {
    rides: number
  }

  export type PassengerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rides?: boolean | PassengerCountOutputTypeCountRidesArgs
  }

  // Custom InputTypes
  /**
   * PassengerCountOutputType without action
   */
  export type PassengerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PassengerCountOutputType
     */
    select?: PassengerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PassengerCountOutputType without action
   */
  export type PassengerCountOutputTypeCountRidesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    rides: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rides?: boolean | VehicleCountOutputTypeCountRidesArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountRidesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideWhereInput
  }


  /**
   * Count Type RideCountOutputType
   */

  export type RideCountOutputType = {
    ratings: number
    locations: number
  }

  export type RideCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | RideCountOutputTypeCountRatingsArgs
    locations?: boolean | RideCountOutputTypeCountLocationsArgs
  }

  // Custom InputTypes
  /**
   * RideCountOutputType without action
   */
  export type RideCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideCountOutputType
     */
    select?: RideCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RideCountOutputType without action
   */
  export type RideCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }

  /**
   * RideCountOutputType without action
   */
  export type RideCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideLocationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    firstName: string | null
    lastName: string | null
    gender: $Enums.Gender | null
    dateOfBirth: Date | null
    profileImage: string | null
    address: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    clerkId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    firstName: string | null
    lastName: string | null
    gender: $Enums.Gender | null
    dateOfBirth: Date | null
    profileImage: string | null
    address: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    clerkId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    phone: number
    firstName: number
    lastName: number
    gender: number
    dateOfBirth: number
    profileImage: number
    address: number
    isVerified: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    clerkId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    firstName?: true
    lastName?: true
    gender?: true
    dateOfBirth?: true
    profileImage?: true
    address?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    clerkId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    firstName?: true
    lastName?: true
    gender?: true
    dateOfBirth?: true
    profileImage?: true
    address?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    clerkId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    firstName?: true
    lastName?: true
    gender?: true
    dateOfBirth?: true
    profileImage?: true
    address?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    clerkId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth: Date | null
    profileImage: string | null
    address: string | null
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    clerkId: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    firstName?: boolean
    lastName?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    profileImage?: boolean
    address?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    clerkId?: boolean
    driver?: boolean | User$driverArgs<ExtArgs>
    passenger?: boolean | User$passengerArgs<ExtArgs>
    ratings?: boolean | User$ratingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    firstName?: boolean
    lastName?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    profileImage?: boolean
    address?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    clerkId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    firstName?: boolean
    lastName?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    profileImage?: boolean
    address?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    clerkId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    phone?: boolean
    firstName?: boolean
    lastName?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    profileImage?: boolean
    address?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    clerkId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "phone" | "firstName" | "lastName" | "gender" | "dateOfBirth" | "profileImage" | "address" | "isVerified" | "createdAt" | "updatedAt" | "deletedAt" | "clerkId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | User$driverArgs<ExtArgs>
    passenger?: boolean | User$passengerArgs<ExtArgs>
    ratings?: boolean | User$ratingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      driver: Prisma.$DriverPayload<ExtArgs> | null
      passenger: Prisma.$PassengerPayload<ExtArgs> | null
      ratings: Prisma.$RatingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      phone: string
      firstName: string
      lastName: string
      gender: $Enums.Gender
      dateOfBirth: Date | null
      profileImage: string | null
      address: string | null
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      clerkId: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends User$driverArgs<ExtArgs> = {}>(args?: Subset<T, User$driverArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    passenger<T extends User$passengerArgs<ExtArgs> = {}>(args?: Subset<T, User$passengerArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ratings<T extends User$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, User$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'Gender'>
    readonly dateOfBirth: FieldRef<"User", 'DateTime'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly clerkId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.driver
   */
  export type User$driverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    where?: DriverWhereInput
  }

  /**
   * User.passenger
   */
  export type User$passengerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    where?: PassengerWhereInput
  }

  /**
   * User.ratings
   */
  export type User$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Driver
   */

  export type AggregateDriver = {
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  export type DriverAvgAggregateOutputType = {
    currentLatitude: number | null
    currentLongitude: number | null
    averageRating: number | null
    totalRides: number | null
  }

  export type DriverSumAggregateOutputType = {
    currentLatitude: number | null
    currentLongitude: number | null
    averageRating: number | null
    totalRides: number | null
  }

  export type DriverMinAggregateOutputType = {
    id: string | null
    userId: string | null
    licenseNumber: string | null
    licenseExpiryDate: Date | null
    isAvailable: boolean | null
    currentLatitude: number | null
    currentLongitude: number | null
    averageRating: number | null
    totalRides: number | null
    accountStatus: $Enums.Status | null
    backgroundCheckStatus: $Enums.Status | null
    backgroundCheckDate: Date | null
    isOnline: boolean | null
    acceptsFemaleOnly: boolean | null
    bankAccount: string | null
  }

  export type DriverMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    licenseNumber: string | null
    licenseExpiryDate: Date | null
    isAvailable: boolean | null
    currentLatitude: number | null
    currentLongitude: number | null
    averageRating: number | null
    totalRides: number | null
    accountStatus: $Enums.Status | null
    backgroundCheckStatus: $Enums.Status | null
    backgroundCheckDate: Date | null
    isOnline: boolean | null
    acceptsFemaleOnly: boolean | null
    bankAccount: string | null
  }

  export type DriverCountAggregateOutputType = {
    id: number
    userId: number
    licenseNumber: number
    licenseExpiryDate: number
    isAvailable: number
    currentLatitude: number
    currentLongitude: number
    averageRating: number
    totalRides: number
    accountStatus: number
    backgroundCheckStatus: number
    backgroundCheckDate: number
    isOnline: number
    acceptsFemaleOnly: number
    bankAccount: number
    _all: number
  }


  export type DriverAvgAggregateInputType = {
    currentLatitude?: true
    currentLongitude?: true
    averageRating?: true
    totalRides?: true
  }

  export type DriverSumAggregateInputType = {
    currentLatitude?: true
    currentLongitude?: true
    averageRating?: true
    totalRides?: true
  }

  export type DriverMinAggregateInputType = {
    id?: true
    userId?: true
    licenseNumber?: true
    licenseExpiryDate?: true
    isAvailable?: true
    currentLatitude?: true
    currentLongitude?: true
    averageRating?: true
    totalRides?: true
    accountStatus?: true
    backgroundCheckStatus?: true
    backgroundCheckDate?: true
    isOnline?: true
    acceptsFemaleOnly?: true
    bankAccount?: true
  }

  export type DriverMaxAggregateInputType = {
    id?: true
    userId?: true
    licenseNumber?: true
    licenseExpiryDate?: true
    isAvailable?: true
    currentLatitude?: true
    currentLongitude?: true
    averageRating?: true
    totalRides?: true
    accountStatus?: true
    backgroundCheckStatus?: true
    backgroundCheckDate?: true
    isOnline?: true
    acceptsFemaleOnly?: true
    bankAccount?: true
  }

  export type DriverCountAggregateInputType = {
    id?: true
    userId?: true
    licenseNumber?: true
    licenseExpiryDate?: true
    isAvailable?: true
    currentLatitude?: true
    currentLongitude?: true
    averageRating?: true
    totalRides?: true
    accountStatus?: true
    backgroundCheckStatus?: true
    backgroundCheckDate?: true
    isOnline?: true
    acceptsFemaleOnly?: true
    bankAccount?: true
    _all?: true
  }

  export type DriverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Driver to aggregate.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drivers
    **/
    _count?: true | DriverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DriverAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DriverSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverMaxAggregateInputType
  }

  export type GetDriverAggregateType<T extends DriverAggregateArgs> = {
        [P in keyof T & keyof AggregateDriver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriver[P]>
      : GetScalarType<T[P], AggregateDriver[P]>
  }




  export type DriverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverWhereInput
    orderBy?: DriverOrderByWithAggregationInput | DriverOrderByWithAggregationInput[]
    by: DriverScalarFieldEnum[] | DriverScalarFieldEnum
    having?: DriverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverCountAggregateInputType | true
    _avg?: DriverAvgAggregateInputType
    _sum?: DriverSumAggregateInputType
    _min?: DriverMinAggregateInputType
    _max?: DriverMaxAggregateInputType
  }

  export type DriverGroupByOutputType = {
    id: string
    userId: string
    licenseNumber: string
    licenseExpiryDate: Date
    isAvailable: boolean
    currentLatitude: number | null
    currentLongitude: number | null
    averageRating: number
    totalRides: number
    accountStatus: $Enums.Status
    backgroundCheckStatus: $Enums.Status
    backgroundCheckDate: Date | null
    isOnline: boolean
    acceptsFemaleOnly: boolean
    bankAccount: string | null
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  type GetDriverGroupByPayload<T extends DriverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverGroupByOutputType[P]>
            : GetScalarType<T[P], DriverGroupByOutputType[P]>
        }
      >
    >


  export type DriverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    licenseNumber?: boolean
    licenseExpiryDate?: boolean
    isAvailable?: boolean
    currentLatitude?: boolean
    currentLongitude?: boolean
    averageRating?: boolean
    totalRides?: boolean
    accountStatus?: boolean
    backgroundCheckStatus?: boolean
    backgroundCheckDate?: boolean
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
    rides?: boolean | Driver$ridesArgs<ExtArgs>
    documents?: boolean | Driver$documentsArgs<ExtArgs>
    _count?: boolean | DriverCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    licenseNumber?: boolean
    licenseExpiryDate?: boolean
    isAvailable?: boolean
    currentLatitude?: boolean
    currentLongitude?: boolean
    averageRating?: boolean
    totalRides?: boolean
    accountStatus?: boolean
    backgroundCheckStatus?: boolean
    backgroundCheckDate?: boolean
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    licenseNumber?: boolean
    licenseExpiryDate?: boolean
    isAvailable?: boolean
    currentLatitude?: boolean
    currentLongitude?: boolean
    averageRating?: boolean
    totalRides?: boolean
    accountStatus?: boolean
    backgroundCheckStatus?: boolean
    backgroundCheckDate?: boolean
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectScalar = {
    id?: boolean
    userId?: boolean
    licenseNumber?: boolean
    licenseExpiryDate?: boolean
    isAvailable?: boolean
    currentLatitude?: boolean
    currentLongitude?: boolean
    averageRating?: boolean
    totalRides?: boolean
    accountStatus?: boolean
    backgroundCheckStatus?: boolean
    backgroundCheckDate?: boolean
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: boolean
  }

  export type DriverOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "licenseNumber" | "licenseExpiryDate" | "isAvailable" | "currentLatitude" | "currentLongitude" | "averageRating" | "totalRides" | "accountStatus" | "backgroundCheckStatus" | "backgroundCheckDate" | "isOnline" | "acceptsFemaleOnly" | "bankAccount", ExtArgs["result"]["driver"]>
  export type DriverInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
    rides?: boolean | Driver$ridesArgs<ExtArgs>
    documents?: boolean | Driver$documentsArgs<ExtArgs>
    _count?: boolean | DriverCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DriverIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DriverIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DriverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Driver"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      vehicle: Prisma.$VehiclePayload<ExtArgs> | null
      rides: Prisma.$RidePayload<ExtArgs>[]
      documents: Prisma.$DriverDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      licenseNumber: string
      licenseExpiryDate: Date
      isAvailable: boolean
      currentLatitude: number | null
      currentLongitude: number | null
      averageRating: number
      totalRides: number
      accountStatus: $Enums.Status
      backgroundCheckStatus: $Enums.Status
      backgroundCheckDate: Date | null
      isOnline: boolean
      acceptsFemaleOnly: boolean
      bankAccount: string | null
    }, ExtArgs["result"]["driver"]>
    composites: {}
  }

  type DriverGetPayload<S extends boolean | null | undefined | DriverDefaultArgs> = $Result.GetResult<Prisma.$DriverPayload, S>

  type DriverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriverFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriverCountAggregateInputType | true
    }

  export interface DriverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Driver'], meta: { name: 'Driver' } }
    /**
     * Find zero or one Driver that matches the filter.
     * @param {DriverFindUniqueArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverFindUniqueArgs>(args: SelectSubset<T, DriverFindUniqueArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Driver that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriverFindUniqueOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverFindFirstArgs>(args?: SelectSubset<T, DriverFindFirstArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.driver.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.driver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverWithIdOnly = await prisma.driver.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverFindManyArgs>(args?: SelectSubset<T, DriverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Driver.
     * @param {DriverCreateArgs} args - Arguments to create a Driver.
     * @example
     * // Create one Driver
     * const Driver = await prisma.driver.create({
     *   data: {
     *     // ... data to create a Driver
     *   }
     * })
     * 
     */
    create<T extends DriverCreateArgs>(args: SelectSubset<T, DriverCreateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drivers.
     * @param {DriverCreateManyArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverCreateManyArgs>(args?: SelectSubset<T, DriverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drivers and returns the data saved in the database.
     * @param {DriverCreateManyAndReturnArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Driver.
     * @param {DriverDeleteArgs} args - Arguments to delete one Driver.
     * @example
     * // Delete one Driver
     * const Driver = await prisma.driver.delete({
     *   where: {
     *     // ... filter to delete one Driver
     *   }
     * })
     * 
     */
    delete<T extends DriverDeleteArgs>(args: SelectSubset<T, DriverDeleteArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Driver.
     * @param {DriverUpdateArgs} args - Arguments to update one Driver.
     * @example
     * // Update one Driver
     * const driver = await prisma.driver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverUpdateArgs>(args: SelectSubset<T, DriverUpdateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drivers.
     * @param {DriverDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.driver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverDeleteManyArgs>(args?: SelectSubset<T, DriverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverUpdateManyArgs>(args: SelectSubset<T, DriverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers and returns the data updated in the database.
     * @param {DriverUpdateManyAndReturnArgs} args - Arguments to update many Drivers.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DriverUpdateManyAndReturnArgs>(args: SelectSubset<T, DriverUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Driver.
     * @param {DriverUpsertArgs} args - Arguments to update or create a Driver.
     * @example
     * // Update or create a Driver
     * const driver = await prisma.driver.upsert({
     *   create: {
     *     // ... data to create a Driver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Driver we want to update
     *   }
     * })
     */
    upsert<T extends DriverUpsertArgs>(args: SelectSubset<T, DriverUpsertArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.driver.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends DriverCountArgs>(
      args?: Subset<T, DriverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriverAggregateArgs>(args: Subset<T, DriverAggregateArgs>): Prisma.PrismaPromise<GetDriverAggregateType<T>>

    /**
     * Group by Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverGroupByArgs['orderBy'] }
        : { orderBy?: DriverGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Driver model
   */
  readonly fields: DriverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Driver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vehicle<T extends Driver$vehicleArgs<ExtArgs> = {}>(args?: Subset<T, Driver$vehicleArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    rides<T extends Driver$ridesArgs<ExtArgs> = {}>(args?: Subset<T, Driver$ridesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Driver$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Driver$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Driver model
   */
  interface DriverFieldRefs {
    readonly id: FieldRef<"Driver", 'String'>
    readonly userId: FieldRef<"Driver", 'String'>
    readonly licenseNumber: FieldRef<"Driver", 'String'>
    readonly licenseExpiryDate: FieldRef<"Driver", 'DateTime'>
    readonly isAvailable: FieldRef<"Driver", 'Boolean'>
    readonly currentLatitude: FieldRef<"Driver", 'Float'>
    readonly currentLongitude: FieldRef<"Driver", 'Float'>
    readonly averageRating: FieldRef<"Driver", 'Float'>
    readonly totalRides: FieldRef<"Driver", 'Int'>
    readonly accountStatus: FieldRef<"Driver", 'Status'>
    readonly backgroundCheckStatus: FieldRef<"Driver", 'Status'>
    readonly backgroundCheckDate: FieldRef<"Driver", 'DateTime'>
    readonly isOnline: FieldRef<"Driver", 'Boolean'>
    readonly acceptsFemaleOnly: FieldRef<"Driver", 'Boolean'>
    readonly bankAccount: FieldRef<"Driver", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Driver findUnique
   */
  export type DriverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findUniqueOrThrow
   */
  export type DriverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findFirst
   */
  export type DriverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findFirstOrThrow
   */
  export type DriverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findMany
   */
  export type DriverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Drivers to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver create
   */
  export type DriverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The data needed to create a Driver.
     */
    data: XOR<DriverCreateInput, DriverUncheckedCreateInput>
  }

  /**
   * Driver createMany
   */
  export type DriverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Driver createManyAndReturn
   */
  export type DriverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Driver update
   */
  export type DriverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The data needed to update a Driver.
     */
    data: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
    /**
     * Choose, which Driver to update.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver updateMany
   */
  export type DriverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
  }

  /**
   * Driver updateManyAndReturn
   */
  export type DriverUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Driver upsert
   */
  export type DriverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The filter to search for the Driver to update in case it exists.
     */
    where: DriverWhereUniqueInput
    /**
     * In case the Driver found by the `where` argument doesn't exist, create a new Driver with this data.
     */
    create: XOR<DriverCreateInput, DriverUncheckedCreateInput>
    /**
     * In case the Driver was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
  }

  /**
   * Driver delete
   */
  export type DriverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter which Driver to delete.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver deleteMany
   */
  export type DriverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drivers to delete
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to delete.
     */
    limit?: number
  }

  /**
   * Driver.vehicle
   */
  export type Driver$vehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
  }

  /**
   * Driver.rides
   */
  export type Driver$ridesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    where?: RideWhereInput
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    cursor?: RideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * Driver.documents
   */
  export type Driver$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    where?: DriverDocumentWhereInput
    orderBy?: DriverDocumentOrderByWithRelationInput | DriverDocumentOrderByWithRelationInput[]
    cursor?: DriverDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DriverDocumentScalarFieldEnum | DriverDocumentScalarFieldEnum[]
  }

  /**
   * Driver without action
   */
  export type DriverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
  }


  /**
   * Model Passenger
   */

  export type AggregatePassenger = {
    _count: PassengerCountAggregateOutputType | null
    _avg: PassengerAvgAggregateOutputType | null
    _sum: PassengerSumAggregateOutputType | null
    _min: PassengerMinAggregateOutputType | null
    _max: PassengerMaxAggregateOutputType | null
  }

  export type PassengerAvgAggregateOutputType = {
    totalRides: number | null
    averageRating: number | null
    homeLatitude: number | null
    homeLongitude: number | null
    workLatitude: number | null
    workLongitude: number | null
  }

  export type PassengerSumAggregateOutputType = {
    totalRides: number | null
    averageRating: number | null
    homeLatitude: number | null
    homeLongitude: number | null
    workLatitude: number | null
    workLongitude: number | null
  }

  export type PassengerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    prefersFemaleDriver: boolean | null
    totalRides: number | null
    averageRating: number | null
    specialNeeds: boolean | null
    specialNeedsDesc: string | null
    homeAddress: string | null
    homeLatitude: number | null
    homeLongitude: number | null
    workAddress: string | null
    workLatitude: number | null
    workLongitude: number | null
  }

  export type PassengerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    prefersFemaleDriver: boolean | null
    totalRides: number | null
    averageRating: number | null
    specialNeeds: boolean | null
    specialNeedsDesc: string | null
    homeAddress: string | null
    homeLatitude: number | null
    homeLongitude: number | null
    workAddress: string | null
    workLatitude: number | null
    workLongitude: number | null
  }

  export type PassengerCountAggregateOutputType = {
    id: number
    userId: number
    prefersFemaleDriver: number
    totalRides: number
    averageRating: number
    specialNeeds: number
    specialNeedsDesc: number
    homeAddress: number
    homeLatitude: number
    homeLongitude: number
    workAddress: number
    workLatitude: number
    workLongitude: number
    _all: number
  }


  export type PassengerAvgAggregateInputType = {
    totalRides?: true
    averageRating?: true
    homeLatitude?: true
    homeLongitude?: true
    workLatitude?: true
    workLongitude?: true
  }

  export type PassengerSumAggregateInputType = {
    totalRides?: true
    averageRating?: true
    homeLatitude?: true
    homeLongitude?: true
    workLatitude?: true
    workLongitude?: true
  }

  export type PassengerMinAggregateInputType = {
    id?: true
    userId?: true
    prefersFemaleDriver?: true
    totalRides?: true
    averageRating?: true
    specialNeeds?: true
    specialNeedsDesc?: true
    homeAddress?: true
    homeLatitude?: true
    homeLongitude?: true
    workAddress?: true
    workLatitude?: true
    workLongitude?: true
  }

  export type PassengerMaxAggregateInputType = {
    id?: true
    userId?: true
    prefersFemaleDriver?: true
    totalRides?: true
    averageRating?: true
    specialNeeds?: true
    specialNeedsDesc?: true
    homeAddress?: true
    homeLatitude?: true
    homeLongitude?: true
    workAddress?: true
    workLatitude?: true
    workLongitude?: true
  }

  export type PassengerCountAggregateInputType = {
    id?: true
    userId?: true
    prefersFemaleDriver?: true
    totalRides?: true
    averageRating?: true
    specialNeeds?: true
    specialNeedsDesc?: true
    homeAddress?: true
    homeLatitude?: true
    homeLongitude?: true
    workAddress?: true
    workLatitude?: true
    workLongitude?: true
    _all?: true
  }

  export type PassengerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Passenger to aggregate.
     */
    where?: PassengerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passengers to fetch.
     */
    orderBy?: PassengerOrderByWithRelationInput | PassengerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PassengerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passengers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passengers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Passengers
    **/
    _count?: true | PassengerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PassengerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PassengerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PassengerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PassengerMaxAggregateInputType
  }

  export type GetPassengerAggregateType<T extends PassengerAggregateArgs> = {
        [P in keyof T & keyof AggregatePassenger]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePassenger[P]>
      : GetScalarType<T[P], AggregatePassenger[P]>
  }




  export type PassengerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PassengerWhereInput
    orderBy?: PassengerOrderByWithAggregationInput | PassengerOrderByWithAggregationInput[]
    by: PassengerScalarFieldEnum[] | PassengerScalarFieldEnum
    having?: PassengerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PassengerCountAggregateInputType | true
    _avg?: PassengerAvgAggregateInputType
    _sum?: PassengerSumAggregateInputType
    _min?: PassengerMinAggregateInputType
    _max?: PassengerMaxAggregateInputType
  }

  export type PassengerGroupByOutputType = {
    id: string
    userId: string
    prefersFemaleDriver: boolean
    totalRides: number
    averageRating: number
    specialNeeds: boolean
    specialNeedsDesc: string | null
    homeAddress: string | null
    homeLatitude: number | null
    homeLongitude: number | null
    workAddress: string | null
    workLatitude: number | null
    workLongitude: number | null
    _count: PassengerCountAggregateOutputType | null
    _avg: PassengerAvgAggregateOutputType | null
    _sum: PassengerSumAggregateOutputType | null
    _min: PassengerMinAggregateOutputType | null
    _max: PassengerMaxAggregateOutputType | null
  }

  type GetPassengerGroupByPayload<T extends PassengerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PassengerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PassengerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PassengerGroupByOutputType[P]>
            : GetScalarType<T[P], PassengerGroupByOutputType[P]>
        }
      >
    >


  export type PassengerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    prefersFemaleDriver?: boolean
    totalRides?: boolean
    averageRating?: boolean
    specialNeeds?: boolean
    specialNeedsDesc?: boolean
    homeAddress?: boolean
    homeLatitude?: boolean
    homeLongitude?: boolean
    workAddress?: boolean
    workLatitude?: boolean
    workLongitude?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    rides?: boolean | Passenger$ridesArgs<ExtArgs>
    _count?: boolean | PassengerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passenger"]>

  export type PassengerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    prefersFemaleDriver?: boolean
    totalRides?: boolean
    averageRating?: boolean
    specialNeeds?: boolean
    specialNeedsDesc?: boolean
    homeAddress?: boolean
    homeLatitude?: boolean
    homeLongitude?: boolean
    workAddress?: boolean
    workLatitude?: boolean
    workLongitude?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passenger"]>

  export type PassengerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    prefersFemaleDriver?: boolean
    totalRides?: boolean
    averageRating?: boolean
    specialNeeds?: boolean
    specialNeedsDesc?: boolean
    homeAddress?: boolean
    homeLatitude?: boolean
    homeLongitude?: boolean
    workAddress?: boolean
    workLatitude?: boolean
    workLongitude?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passenger"]>

  export type PassengerSelectScalar = {
    id?: boolean
    userId?: boolean
    prefersFemaleDriver?: boolean
    totalRides?: boolean
    averageRating?: boolean
    specialNeeds?: boolean
    specialNeedsDesc?: boolean
    homeAddress?: boolean
    homeLatitude?: boolean
    homeLongitude?: boolean
    workAddress?: boolean
    workLatitude?: boolean
    workLongitude?: boolean
  }

  export type PassengerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "prefersFemaleDriver" | "totalRides" | "averageRating" | "specialNeeds" | "specialNeedsDesc" | "homeAddress" | "homeLatitude" | "homeLongitude" | "workAddress" | "workLatitude" | "workLongitude", ExtArgs["result"]["passenger"]>
  export type PassengerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    rides?: boolean | Passenger$ridesArgs<ExtArgs>
    _count?: boolean | PassengerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PassengerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PassengerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PassengerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Passenger"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      rides: Prisma.$RidePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      prefersFemaleDriver: boolean
      totalRides: number
      averageRating: number
      specialNeeds: boolean
      specialNeedsDesc: string | null
      homeAddress: string | null
      homeLatitude: number | null
      homeLongitude: number | null
      workAddress: string | null
      workLatitude: number | null
      workLongitude: number | null
    }, ExtArgs["result"]["passenger"]>
    composites: {}
  }

  type PassengerGetPayload<S extends boolean | null | undefined | PassengerDefaultArgs> = $Result.GetResult<Prisma.$PassengerPayload, S>

  type PassengerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PassengerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PassengerCountAggregateInputType | true
    }

  export interface PassengerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Passenger'], meta: { name: 'Passenger' } }
    /**
     * Find zero or one Passenger that matches the filter.
     * @param {PassengerFindUniqueArgs} args - Arguments to find a Passenger
     * @example
     * // Get one Passenger
     * const passenger = await prisma.passenger.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PassengerFindUniqueArgs>(args: SelectSubset<T, PassengerFindUniqueArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Passenger that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PassengerFindUniqueOrThrowArgs} args - Arguments to find a Passenger
     * @example
     * // Get one Passenger
     * const passenger = await prisma.passenger.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PassengerFindUniqueOrThrowArgs>(args: SelectSubset<T, PassengerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Passenger that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerFindFirstArgs} args - Arguments to find a Passenger
     * @example
     * // Get one Passenger
     * const passenger = await prisma.passenger.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PassengerFindFirstArgs>(args?: SelectSubset<T, PassengerFindFirstArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Passenger that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerFindFirstOrThrowArgs} args - Arguments to find a Passenger
     * @example
     * // Get one Passenger
     * const passenger = await prisma.passenger.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PassengerFindFirstOrThrowArgs>(args?: SelectSubset<T, PassengerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Passengers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Passengers
     * const passengers = await prisma.passenger.findMany()
     * 
     * // Get first 10 Passengers
     * const passengers = await prisma.passenger.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passengerWithIdOnly = await prisma.passenger.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PassengerFindManyArgs>(args?: SelectSubset<T, PassengerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Passenger.
     * @param {PassengerCreateArgs} args - Arguments to create a Passenger.
     * @example
     * // Create one Passenger
     * const Passenger = await prisma.passenger.create({
     *   data: {
     *     // ... data to create a Passenger
     *   }
     * })
     * 
     */
    create<T extends PassengerCreateArgs>(args: SelectSubset<T, PassengerCreateArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Passengers.
     * @param {PassengerCreateManyArgs} args - Arguments to create many Passengers.
     * @example
     * // Create many Passengers
     * const passenger = await prisma.passenger.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PassengerCreateManyArgs>(args?: SelectSubset<T, PassengerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Passengers and returns the data saved in the database.
     * @param {PassengerCreateManyAndReturnArgs} args - Arguments to create many Passengers.
     * @example
     * // Create many Passengers
     * const passenger = await prisma.passenger.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Passengers and only return the `id`
     * const passengerWithIdOnly = await prisma.passenger.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PassengerCreateManyAndReturnArgs>(args?: SelectSubset<T, PassengerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Passenger.
     * @param {PassengerDeleteArgs} args - Arguments to delete one Passenger.
     * @example
     * // Delete one Passenger
     * const Passenger = await prisma.passenger.delete({
     *   where: {
     *     // ... filter to delete one Passenger
     *   }
     * })
     * 
     */
    delete<T extends PassengerDeleteArgs>(args: SelectSubset<T, PassengerDeleteArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Passenger.
     * @param {PassengerUpdateArgs} args - Arguments to update one Passenger.
     * @example
     * // Update one Passenger
     * const passenger = await prisma.passenger.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PassengerUpdateArgs>(args: SelectSubset<T, PassengerUpdateArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Passengers.
     * @param {PassengerDeleteManyArgs} args - Arguments to filter Passengers to delete.
     * @example
     * // Delete a few Passengers
     * const { count } = await prisma.passenger.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PassengerDeleteManyArgs>(args?: SelectSubset<T, PassengerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passengers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Passengers
     * const passenger = await prisma.passenger.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PassengerUpdateManyArgs>(args: SelectSubset<T, PassengerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passengers and returns the data updated in the database.
     * @param {PassengerUpdateManyAndReturnArgs} args - Arguments to update many Passengers.
     * @example
     * // Update many Passengers
     * const passenger = await prisma.passenger.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Passengers and only return the `id`
     * const passengerWithIdOnly = await prisma.passenger.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PassengerUpdateManyAndReturnArgs>(args: SelectSubset<T, PassengerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Passenger.
     * @param {PassengerUpsertArgs} args - Arguments to update or create a Passenger.
     * @example
     * // Update or create a Passenger
     * const passenger = await prisma.passenger.upsert({
     *   create: {
     *     // ... data to create a Passenger
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Passenger we want to update
     *   }
     * })
     */
    upsert<T extends PassengerUpsertArgs>(args: SelectSubset<T, PassengerUpsertArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Passengers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerCountArgs} args - Arguments to filter Passengers to count.
     * @example
     * // Count the number of Passengers
     * const count = await prisma.passenger.count({
     *   where: {
     *     // ... the filter for the Passengers we want to count
     *   }
     * })
    **/
    count<T extends PassengerCountArgs>(
      args?: Subset<T, PassengerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PassengerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Passenger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PassengerAggregateArgs>(args: Subset<T, PassengerAggregateArgs>): Prisma.PrismaPromise<GetPassengerAggregateType<T>>

    /**
     * Group by Passenger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PassengerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PassengerGroupByArgs['orderBy'] }
        : { orderBy?: PassengerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PassengerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPassengerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Passenger model
   */
  readonly fields: PassengerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Passenger.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PassengerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rides<T extends Passenger$ridesArgs<ExtArgs> = {}>(args?: Subset<T, Passenger$ridesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Passenger model
   */
  interface PassengerFieldRefs {
    readonly id: FieldRef<"Passenger", 'String'>
    readonly userId: FieldRef<"Passenger", 'String'>
    readonly prefersFemaleDriver: FieldRef<"Passenger", 'Boolean'>
    readonly totalRides: FieldRef<"Passenger", 'Int'>
    readonly averageRating: FieldRef<"Passenger", 'Float'>
    readonly specialNeeds: FieldRef<"Passenger", 'Boolean'>
    readonly specialNeedsDesc: FieldRef<"Passenger", 'String'>
    readonly homeAddress: FieldRef<"Passenger", 'String'>
    readonly homeLatitude: FieldRef<"Passenger", 'Float'>
    readonly homeLongitude: FieldRef<"Passenger", 'Float'>
    readonly workAddress: FieldRef<"Passenger", 'String'>
    readonly workLatitude: FieldRef<"Passenger", 'Float'>
    readonly workLongitude: FieldRef<"Passenger", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Passenger findUnique
   */
  export type PassengerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passenger to fetch.
     */
    where: PassengerWhereUniqueInput
  }

  /**
   * Passenger findUniqueOrThrow
   */
  export type PassengerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passenger to fetch.
     */
    where: PassengerWhereUniqueInput
  }

  /**
   * Passenger findFirst
   */
  export type PassengerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passenger to fetch.
     */
    where?: PassengerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passengers to fetch.
     */
    orderBy?: PassengerOrderByWithRelationInput | PassengerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passengers.
     */
    cursor?: PassengerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passengers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passengers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passengers.
     */
    distinct?: PassengerScalarFieldEnum | PassengerScalarFieldEnum[]
  }

  /**
   * Passenger findFirstOrThrow
   */
  export type PassengerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passenger to fetch.
     */
    where?: PassengerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passengers to fetch.
     */
    orderBy?: PassengerOrderByWithRelationInput | PassengerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passengers.
     */
    cursor?: PassengerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passengers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passengers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passengers.
     */
    distinct?: PassengerScalarFieldEnum | PassengerScalarFieldEnum[]
  }

  /**
   * Passenger findMany
   */
  export type PassengerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passengers to fetch.
     */
    where?: PassengerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passengers to fetch.
     */
    orderBy?: PassengerOrderByWithRelationInput | PassengerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Passengers.
     */
    cursor?: PassengerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passengers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passengers.
     */
    skip?: number
    distinct?: PassengerScalarFieldEnum | PassengerScalarFieldEnum[]
  }

  /**
   * Passenger create
   */
  export type PassengerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * The data needed to create a Passenger.
     */
    data: XOR<PassengerCreateInput, PassengerUncheckedCreateInput>
  }

  /**
   * Passenger createMany
   */
  export type PassengerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Passengers.
     */
    data: PassengerCreateManyInput | PassengerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Passenger createManyAndReturn
   */
  export type PassengerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * The data used to create many Passengers.
     */
    data: PassengerCreateManyInput | PassengerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Passenger update
   */
  export type PassengerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * The data needed to update a Passenger.
     */
    data: XOR<PassengerUpdateInput, PassengerUncheckedUpdateInput>
    /**
     * Choose, which Passenger to update.
     */
    where: PassengerWhereUniqueInput
  }

  /**
   * Passenger updateMany
   */
  export type PassengerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Passengers.
     */
    data: XOR<PassengerUpdateManyMutationInput, PassengerUncheckedUpdateManyInput>
    /**
     * Filter which Passengers to update
     */
    where?: PassengerWhereInput
    /**
     * Limit how many Passengers to update.
     */
    limit?: number
  }

  /**
   * Passenger updateManyAndReturn
   */
  export type PassengerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * The data used to update Passengers.
     */
    data: XOR<PassengerUpdateManyMutationInput, PassengerUncheckedUpdateManyInput>
    /**
     * Filter which Passengers to update
     */
    where?: PassengerWhereInput
    /**
     * Limit how many Passengers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Passenger upsert
   */
  export type PassengerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * The filter to search for the Passenger to update in case it exists.
     */
    where: PassengerWhereUniqueInput
    /**
     * In case the Passenger found by the `where` argument doesn't exist, create a new Passenger with this data.
     */
    create: XOR<PassengerCreateInput, PassengerUncheckedCreateInput>
    /**
     * In case the Passenger was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PassengerUpdateInput, PassengerUncheckedUpdateInput>
  }

  /**
   * Passenger delete
   */
  export type PassengerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter which Passenger to delete.
     */
    where: PassengerWhereUniqueInput
  }

  /**
   * Passenger deleteMany
   */
  export type PassengerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Passengers to delete
     */
    where?: PassengerWhereInput
    /**
     * Limit how many Passengers to delete.
     */
    limit?: number
  }

  /**
   * Passenger.rides
   */
  export type Passenger$ridesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    where?: RideWhereInput
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    cursor?: RideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * Passenger without action
   */
  export type PassengerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    year: number | null
    capacity: number | null
  }

  export type VehicleSumAggregateOutputType = {
    year: number | null
    capacity: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    driverId: string | null
    make: string | null
    model: string | null
    year: number | null
    color: string | null
    licensePlate: string | null
    registrationExpiryDate: Date | null
    insuranceExpiryDate: Date | null
    vehicleType: $Enums.VehicleType | null
    capacity: number | null
    accessibility: boolean | null
    carImageUrl: string | null
    inspectionStatus: $Enums.Status | null
    inspectionDate: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    driverId: string | null
    make: string | null
    model: string | null
    year: number | null
    color: string | null
    licensePlate: string | null
    registrationExpiryDate: Date | null
    insuranceExpiryDate: Date | null
    vehicleType: $Enums.VehicleType | null
    capacity: number | null
    accessibility: boolean | null
    carImageUrl: string | null
    inspectionStatus: $Enums.Status | null
    inspectionDate: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    driverId: number
    make: number
    model: number
    year: number
    color: number
    licensePlate: number
    registrationExpiryDate: number
    insuranceExpiryDate: number
    vehicleType: number
    capacity: number
    accessibility: number
    carImageUrl: number
    features: number
    inspectionStatus: number
    inspectionDate: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    year?: true
    capacity?: true
  }

  export type VehicleSumAggregateInputType = {
    year?: true
    capacity?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    driverId?: true
    make?: true
    model?: true
    year?: true
    color?: true
    licensePlate?: true
    registrationExpiryDate?: true
    insuranceExpiryDate?: true
    vehicleType?: true
    capacity?: true
    accessibility?: true
    carImageUrl?: true
    inspectionStatus?: true
    inspectionDate?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    driverId?: true
    make?: true
    model?: true
    year?: true
    color?: true
    licensePlate?: true
    registrationExpiryDate?: true
    insuranceExpiryDate?: true
    vehicleType?: true
    capacity?: true
    accessibility?: true
    carImageUrl?: true
    inspectionStatus?: true
    inspectionDate?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    driverId?: true
    make?: true
    model?: true
    year?: true
    color?: true
    licensePlate?: true
    registrationExpiryDate?: true
    insuranceExpiryDate?: true
    vehicleType?: true
    capacity?: true
    accessibility?: true
    carImageUrl?: true
    features?: true
    inspectionStatus?: true
    inspectionDate?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    driverId: string
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
    registrationExpiryDate: Date
    insuranceExpiryDate: Date
    vehicleType: $Enums.VehicleType
    capacity: number
    accessibility: boolean
    carImageUrl: string | null
    features: string[]
    inspectionStatus: $Enums.Status
    inspectionDate: Date | null
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    licensePlate?: boolean
    registrationExpiryDate?: boolean
    insuranceExpiryDate?: boolean
    vehicleType?: boolean
    capacity?: boolean
    accessibility?: boolean
    carImageUrl?: boolean
    features?: boolean
    inspectionStatus?: boolean
    inspectionDate?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    rides?: boolean | Vehicle$ridesArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    licensePlate?: boolean
    registrationExpiryDate?: boolean
    insuranceExpiryDate?: boolean
    vehicleType?: boolean
    capacity?: boolean
    accessibility?: boolean
    carImageUrl?: boolean
    features?: boolean
    inspectionStatus?: boolean
    inspectionDate?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    licensePlate?: boolean
    registrationExpiryDate?: boolean
    insuranceExpiryDate?: boolean
    vehicleType?: boolean
    capacity?: boolean
    accessibility?: boolean
    carImageUrl?: boolean
    features?: boolean
    inspectionStatus?: boolean
    inspectionDate?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    driverId?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    licensePlate?: boolean
    registrationExpiryDate?: boolean
    insuranceExpiryDate?: boolean
    vehicleType?: boolean
    capacity?: boolean
    accessibility?: boolean
    carImageUrl?: boolean
    features?: boolean
    inspectionStatus?: boolean
    inspectionDate?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "driverId" | "make" | "model" | "year" | "color" | "licensePlate" | "registrationExpiryDate" | "insuranceExpiryDate" | "vehicleType" | "capacity" | "accessibility" | "carImageUrl" | "features" | "inspectionStatus" | "inspectionDate", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
    rides?: boolean | Vehicle$ridesArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      driver: Prisma.$DriverPayload<ExtArgs>
      rides: Prisma.$RidePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      driverId: string
      make: string
      model: string
      year: number
      color: string
      licensePlate: string
      registrationExpiryDate: Date
      insuranceExpiryDate: Date
      vehicleType: $Enums.VehicleType
      capacity: number
      accessibility: boolean
      carImageUrl: string | null
      features: string[]
      inspectionStatus: $Enums.Status
      inspectionDate: Date | null
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends DriverDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DriverDefaultArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rides<T extends Vehicle$ridesArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$ridesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly driverId: FieldRef<"Vehicle", 'String'>
    readonly make: FieldRef<"Vehicle", 'String'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly year: FieldRef<"Vehicle", 'Int'>
    readonly color: FieldRef<"Vehicle", 'String'>
    readonly licensePlate: FieldRef<"Vehicle", 'String'>
    readonly registrationExpiryDate: FieldRef<"Vehicle", 'DateTime'>
    readonly insuranceExpiryDate: FieldRef<"Vehicle", 'DateTime'>
    readonly vehicleType: FieldRef<"Vehicle", 'VehicleType'>
    readonly capacity: FieldRef<"Vehicle", 'Int'>
    readonly accessibility: FieldRef<"Vehicle", 'Boolean'>
    readonly carImageUrl: FieldRef<"Vehicle", 'String'>
    readonly features: FieldRef<"Vehicle", 'String[]'>
    readonly inspectionStatus: FieldRef<"Vehicle", 'Status'>
    readonly inspectionDate: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.rides
   */
  export type Vehicle$ridesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    where?: RideWhereInput
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    cursor?: RideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model Ride
   */

  export type AggregateRide = {
    _count: RideCountAggregateOutputType | null
    _avg: RideAvgAggregateOutputType | null
    _sum: RideSumAggregateOutputType | null
    _min: RideMinAggregateOutputType | null
    _max: RideMaxAggregateOutputType | null
  }

  export type RideAvgAggregateOutputType = {
    originLatitude: number | null
    originLongitude: number | null
    destinationLatitude: number | null
    destinationLongitude: number | null
    estimatedDuration: number | null
    actualDuration: number | null
    estimatedDistance: number | null
    actualDistance: number | null
    basePrice: number | null
    finalPrice: number | null
    cancellationFee: number | null
    baggageQuantity: number | null
  }

  export type RideSumAggregateOutputType = {
    originLatitude: number | null
    originLongitude: number | null
    destinationLatitude: number | null
    destinationLongitude: number | null
    estimatedDuration: number | null
    actualDuration: number | null
    estimatedDistance: number | null
    actualDistance: number | null
    basePrice: number | null
    finalPrice: number | null
    cancellationFee: number | null
    baggageQuantity: number | null
  }

  export type RideMinAggregateOutputType = {
    id: string | null
    passengerId: string | null
    driverId: string | null
    vehicleId: string | null
    status: $Enums.RideStatus | null
    requestTime: Date | null
    acceptTime: Date | null
    pickupTime: Date | null
    dropOffTime: Date | null
    originAddress: string | null
    originLatitude: number | null
    originLongitude: number | null
    destinationAddress: string | null
    destinationLatitude: number | null
    destinationLongitude: number | null
    estimatedDuration: number | null
    actualDuration: number | null
    estimatedDistance: number | null
    actualDistance: number | null
    basePrice: number | null
    finalPrice: number | null
    currency: string | null
    paymentStatus: $Enums.PaymentStatus | null
    paymentMethodId: string | null
    cancellationReason: string | null
    cancellationTime: Date | null
    cancellationFee: number | null
    isFemaleOnlyRide: boolean | null
    specialRequirements: string | null
    baggageQuantity: number | null
    rideType: $Enums.RideType | null
    scheduledTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RideMaxAggregateOutputType = {
    id: string | null
    passengerId: string | null
    driverId: string | null
    vehicleId: string | null
    status: $Enums.RideStatus | null
    requestTime: Date | null
    acceptTime: Date | null
    pickupTime: Date | null
    dropOffTime: Date | null
    originAddress: string | null
    originLatitude: number | null
    originLongitude: number | null
    destinationAddress: string | null
    destinationLatitude: number | null
    destinationLongitude: number | null
    estimatedDuration: number | null
    actualDuration: number | null
    estimatedDistance: number | null
    actualDistance: number | null
    basePrice: number | null
    finalPrice: number | null
    currency: string | null
    paymentStatus: $Enums.PaymentStatus | null
    paymentMethodId: string | null
    cancellationReason: string | null
    cancellationTime: Date | null
    cancellationFee: number | null
    isFemaleOnlyRide: boolean | null
    specialRequirements: string | null
    baggageQuantity: number | null
    rideType: $Enums.RideType | null
    scheduledTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RideCountAggregateOutputType = {
    id: number
    passengerId: number
    driverId: number
    vehicleId: number
    status: number
    requestTime: number
    acceptTime: number
    pickupTime: number
    dropOffTime: number
    originAddress: number
    originLatitude: number
    originLongitude: number
    destinationAddress: number
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration: number
    estimatedDistance: number
    actualDistance: number
    basePrice: number
    finalPrice: number
    currency: number
    paymentStatus: number
    paymentMethodId: number
    cancellationReason: number
    cancellationTime: number
    cancellationFee: number
    isFemaleOnlyRide: number
    specialRequirements: number
    baggageQuantity: number
    rideType: number
    scheduledTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RideAvgAggregateInputType = {
    originLatitude?: true
    originLongitude?: true
    destinationLatitude?: true
    destinationLongitude?: true
    estimatedDuration?: true
    actualDuration?: true
    estimatedDistance?: true
    actualDistance?: true
    basePrice?: true
    finalPrice?: true
    cancellationFee?: true
    baggageQuantity?: true
  }

  export type RideSumAggregateInputType = {
    originLatitude?: true
    originLongitude?: true
    destinationLatitude?: true
    destinationLongitude?: true
    estimatedDuration?: true
    actualDuration?: true
    estimatedDistance?: true
    actualDistance?: true
    basePrice?: true
    finalPrice?: true
    cancellationFee?: true
    baggageQuantity?: true
  }

  export type RideMinAggregateInputType = {
    id?: true
    passengerId?: true
    driverId?: true
    vehicleId?: true
    status?: true
    requestTime?: true
    acceptTime?: true
    pickupTime?: true
    dropOffTime?: true
    originAddress?: true
    originLatitude?: true
    originLongitude?: true
    destinationAddress?: true
    destinationLatitude?: true
    destinationLongitude?: true
    estimatedDuration?: true
    actualDuration?: true
    estimatedDistance?: true
    actualDistance?: true
    basePrice?: true
    finalPrice?: true
    currency?: true
    paymentStatus?: true
    paymentMethodId?: true
    cancellationReason?: true
    cancellationTime?: true
    cancellationFee?: true
    isFemaleOnlyRide?: true
    specialRequirements?: true
    baggageQuantity?: true
    rideType?: true
    scheduledTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RideMaxAggregateInputType = {
    id?: true
    passengerId?: true
    driverId?: true
    vehicleId?: true
    status?: true
    requestTime?: true
    acceptTime?: true
    pickupTime?: true
    dropOffTime?: true
    originAddress?: true
    originLatitude?: true
    originLongitude?: true
    destinationAddress?: true
    destinationLatitude?: true
    destinationLongitude?: true
    estimatedDuration?: true
    actualDuration?: true
    estimatedDistance?: true
    actualDistance?: true
    basePrice?: true
    finalPrice?: true
    currency?: true
    paymentStatus?: true
    paymentMethodId?: true
    cancellationReason?: true
    cancellationTime?: true
    cancellationFee?: true
    isFemaleOnlyRide?: true
    specialRequirements?: true
    baggageQuantity?: true
    rideType?: true
    scheduledTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RideCountAggregateInputType = {
    id?: true
    passengerId?: true
    driverId?: true
    vehicleId?: true
    status?: true
    requestTime?: true
    acceptTime?: true
    pickupTime?: true
    dropOffTime?: true
    originAddress?: true
    originLatitude?: true
    originLongitude?: true
    destinationAddress?: true
    destinationLatitude?: true
    destinationLongitude?: true
    estimatedDuration?: true
    actualDuration?: true
    estimatedDistance?: true
    actualDistance?: true
    basePrice?: true
    finalPrice?: true
    currency?: true
    paymentStatus?: true
    paymentMethodId?: true
    cancellationReason?: true
    cancellationTime?: true
    cancellationFee?: true
    isFemaleOnlyRide?: true
    specialRequirements?: true
    baggageQuantity?: true
    rideType?: true
    scheduledTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RideAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ride to aggregate.
     */
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rides
    **/
    _count?: true | RideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RideAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RideSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RideMaxAggregateInputType
  }

  export type GetRideAggregateType<T extends RideAggregateArgs> = {
        [P in keyof T & keyof AggregateRide]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRide[P]>
      : GetScalarType<T[P], AggregateRide[P]>
  }




  export type RideGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideWhereInput
    orderBy?: RideOrderByWithAggregationInput | RideOrderByWithAggregationInput[]
    by: RideScalarFieldEnum[] | RideScalarFieldEnum
    having?: RideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RideCountAggregateInputType | true
    _avg?: RideAvgAggregateInputType
    _sum?: RideSumAggregateInputType
    _min?: RideMinAggregateInputType
    _max?: RideMaxAggregateInputType
  }

  export type RideGroupByOutputType = {
    id: string
    passengerId: string
    driverId: string | null
    vehicleId: string | null
    status: $Enums.RideStatus
    requestTime: Date
    acceptTime: Date | null
    pickupTime: Date | null
    dropOffTime: Date | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration: number | null
    estimatedDistance: number
    actualDistance: number | null
    basePrice: number
    finalPrice: number | null
    currency: string
    paymentStatus: $Enums.PaymentStatus
    paymentMethodId: string | null
    cancellationReason: string | null
    cancellationTime: Date | null
    cancellationFee: number | null
    isFemaleOnlyRide: boolean
    specialRequirements: string | null
    baggageQuantity: number
    rideType: $Enums.RideType
    scheduledTime: Date | null
    createdAt: Date
    updatedAt: Date
    _count: RideCountAggregateOutputType | null
    _avg: RideAvgAggregateOutputType | null
    _sum: RideSumAggregateOutputType | null
    _min: RideMinAggregateOutputType | null
    _max: RideMaxAggregateOutputType | null
  }

  type GetRideGroupByPayload<T extends RideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RideGroupByOutputType[P]>
            : GetScalarType<T[P], RideGroupByOutputType[P]>
        }
      >
    >


  export type RideSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    passengerId?: boolean
    driverId?: boolean
    vehicleId?: boolean
    status?: boolean
    requestTime?: boolean
    acceptTime?: boolean
    pickupTime?: boolean
    dropOffTime?: boolean
    originAddress?: boolean
    originLatitude?: boolean
    originLongitude?: boolean
    destinationAddress?: boolean
    destinationLatitude?: boolean
    destinationLongitude?: boolean
    estimatedDuration?: boolean
    actualDuration?: boolean
    estimatedDistance?: boolean
    actualDistance?: boolean
    basePrice?: boolean
    finalPrice?: boolean
    currency?: boolean
    paymentStatus?: boolean
    paymentMethodId?: boolean
    cancellationReason?: boolean
    cancellationTime?: boolean
    cancellationFee?: boolean
    isFemaleOnlyRide?: boolean
    specialRequirements?: boolean
    baggageQuantity?: boolean
    rideType?: boolean
    scheduledTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passenger?: boolean | PassengerDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
    vehicle?: boolean | Ride$vehicleArgs<ExtArgs>
    ratings?: boolean | Ride$ratingsArgs<ExtArgs>
    payment?: boolean | Ride$paymentArgs<ExtArgs>
    locations?: boolean | Ride$locationsArgs<ExtArgs>
    _count?: boolean | RideCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ride"]>

  export type RideSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    passengerId?: boolean
    driverId?: boolean
    vehicleId?: boolean
    status?: boolean
    requestTime?: boolean
    acceptTime?: boolean
    pickupTime?: boolean
    dropOffTime?: boolean
    originAddress?: boolean
    originLatitude?: boolean
    originLongitude?: boolean
    destinationAddress?: boolean
    destinationLatitude?: boolean
    destinationLongitude?: boolean
    estimatedDuration?: boolean
    actualDuration?: boolean
    estimatedDistance?: boolean
    actualDistance?: boolean
    basePrice?: boolean
    finalPrice?: boolean
    currency?: boolean
    paymentStatus?: boolean
    paymentMethodId?: boolean
    cancellationReason?: boolean
    cancellationTime?: boolean
    cancellationFee?: boolean
    isFemaleOnlyRide?: boolean
    specialRequirements?: boolean
    baggageQuantity?: boolean
    rideType?: boolean
    scheduledTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passenger?: boolean | PassengerDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
    vehicle?: boolean | Ride$vehicleArgs<ExtArgs>
  }, ExtArgs["result"]["ride"]>

  export type RideSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    passengerId?: boolean
    driverId?: boolean
    vehicleId?: boolean
    status?: boolean
    requestTime?: boolean
    acceptTime?: boolean
    pickupTime?: boolean
    dropOffTime?: boolean
    originAddress?: boolean
    originLatitude?: boolean
    originLongitude?: boolean
    destinationAddress?: boolean
    destinationLatitude?: boolean
    destinationLongitude?: boolean
    estimatedDuration?: boolean
    actualDuration?: boolean
    estimatedDistance?: boolean
    actualDistance?: boolean
    basePrice?: boolean
    finalPrice?: boolean
    currency?: boolean
    paymentStatus?: boolean
    paymentMethodId?: boolean
    cancellationReason?: boolean
    cancellationTime?: boolean
    cancellationFee?: boolean
    isFemaleOnlyRide?: boolean
    specialRequirements?: boolean
    baggageQuantity?: boolean
    rideType?: boolean
    scheduledTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passenger?: boolean | PassengerDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
    vehicle?: boolean | Ride$vehicleArgs<ExtArgs>
  }, ExtArgs["result"]["ride"]>

  export type RideSelectScalar = {
    id?: boolean
    passengerId?: boolean
    driverId?: boolean
    vehicleId?: boolean
    status?: boolean
    requestTime?: boolean
    acceptTime?: boolean
    pickupTime?: boolean
    dropOffTime?: boolean
    originAddress?: boolean
    originLatitude?: boolean
    originLongitude?: boolean
    destinationAddress?: boolean
    destinationLatitude?: boolean
    destinationLongitude?: boolean
    estimatedDuration?: boolean
    actualDuration?: boolean
    estimatedDistance?: boolean
    actualDistance?: boolean
    basePrice?: boolean
    finalPrice?: boolean
    currency?: boolean
    paymentStatus?: boolean
    paymentMethodId?: boolean
    cancellationReason?: boolean
    cancellationTime?: boolean
    cancellationFee?: boolean
    isFemaleOnlyRide?: boolean
    specialRequirements?: boolean
    baggageQuantity?: boolean
    rideType?: boolean
    scheduledTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "passengerId" | "driverId" | "vehicleId" | "status" | "requestTime" | "acceptTime" | "pickupTime" | "dropOffTime" | "originAddress" | "originLatitude" | "originLongitude" | "destinationAddress" | "destinationLatitude" | "destinationLongitude" | "estimatedDuration" | "actualDuration" | "estimatedDistance" | "actualDistance" | "basePrice" | "finalPrice" | "currency" | "paymentStatus" | "paymentMethodId" | "cancellationReason" | "cancellationTime" | "cancellationFee" | "isFemaleOnlyRide" | "specialRequirements" | "baggageQuantity" | "rideType" | "scheduledTime" | "createdAt" | "updatedAt", ExtArgs["result"]["ride"]>
  export type RideInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passenger?: boolean | PassengerDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
    vehicle?: boolean | Ride$vehicleArgs<ExtArgs>
    ratings?: boolean | Ride$ratingsArgs<ExtArgs>
    payment?: boolean | Ride$paymentArgs<ExtArgs>
    locations?: boolean | Ride$locationsArgs<ExtArgs>
    _count?: boolean | RideCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RideIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passenger?: boolean | PassengerDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
    vehicle?: boolean | Ride$vehicleArgs<ExtArgs>
  }
  export type RideIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passenger?: boolean | PassengerDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
    vehicle?: boolean | Ride$vehicleArgs<ExtArgs>
  }

  export type $RidePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ride"
    objects: {
      passenger: Prisma.$PassengerPayload<ExtArgs>
      driver: Prisma.$DriverPayload<ExtArgs> | null
      vehicle: Prisma.$VehiclePayload<ExtArgs> | null
      ratings: Prisma.$RatingPayload<ExtArgs>[]
      payment: Prisma.$PaymentPayload<ExtArgs> | null
      locations: Prisma.$RideLocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      passengerId: string
      driverId: string | null
      vehicleId: string | null
      status: $Enums.RideStatus
      requestTime: Date
      acceptTime: Date | null
      pickupTime: Date | null
      dropOffTime: Date | null
      originAddress: string
      originLatitude: number
      originLongitude: number
      destinationAddress: string
      destinationLatitude: number
      destinationLongitude: number
      estimatedDuration: number
      actualDuration: number | null
      estimatedDistance: number
      actualDistance: number | null
      basePrice: number
      finalPrice: number | null
      currency: string
      paymentStatus: $Enums.PaymentStatus
      paymentMethodId: string | null
      cancellationReason: string | null
      cancellationTime: Date | null
      cancellationFee: number | null
      isFemaleOnlyRide: boolean
      specialRequirements: string | null
      baggageQuantity: number
      rideType: $Enums.RideType
      scheduledTime: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ride"]>
    composites: {}
  }

  type RideGetPayload<S extends boolean | null | undefined | RideDefaultArgs> = $Result.GetResult<Prisma.$RidePayload, S>

  type RideCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RideFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RideCountAggregateInputType | true
    }

  export interface RideDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ride'], meta: { name: 'Ride' } }
    /**
     * Find zero or one Ride that matches the filter.
     * @param {RideFindUniqueArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RideFindUniqueArgs>(args: SelectSubset<T, RideFindUniqueArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ride that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RideFindUniqueOrThrowArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RideFindUniqueOrThrowArgs>(args: SelectSubset<T, RideFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ride that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindFirstArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RideFindFirstArgs>(args?: SelectSubset<T, RideFindFirstArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ride that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindFirstOrThrowArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RideFindFirstOrThrowArgs>(args?: SelectSubset<T, RideFindFirstOrThrowArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rides
     * const rides = await prisma.ride.findMany()
     * 
     * // Get first 10 Rides
     * const rides = await prisma.ride.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rideWithIdOnly = await prisma.ride.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RideFindManyArgs>(args?: SelectSubset<T, RideFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ride.
     * @param {RideCreateArgs} args - Arguments to create a Ride.
     * @example
     * // Create one Ride
     * const Ride = await prisma.ride.create({
     *   data: {
     *     // ... data to create a Ride
     *   }
     * })
     * 
     */
    create<T extends RideCreateArgs>(args: SelectSubset<T, RideCreateArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rides.
     * @param {RideCreateManyArgs} args - Arguments to create many Rides.
     * @example
     * // Create many Rides
     * const ride = await prisma.ride.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RideCreateManyArgs>(args?: SelectSubset<T, RideCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rides and returns the data saved in the database.
     * @param {RideCreateManyAndReturnArgs} args - Arguments to create many Rides.
     * @example
     * // Create many Rides
     * const ride = await prisma.ride.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rides and only return the `id`
     * const rideWithIdOnly = await prisma.ride.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RideCreateManyAndReturnArgs>(args?: SelectSubset<T, RideCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ride.
     * @param {RideDeleteArgs} args - Arguments to delete one Ride.
     * @example
     * // Delete one Ride
     * const Ride = await prisma.ride.delete({
     *   where: {
     *     // ... filter to delete one Ride
     *   }
     * })
     * 
     */
    delete<T extends RideDeleteArgs>(args: SelectSubset<T, RideDeleteArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ride.
     * @param {RideUpdateArgs} args - Arguments to update one Ride.
     * @example
     * // Update one Ride
     * const ride = await prisma.ride.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RideUpdateArgs>(args: SelectSubset<T, RideUpdateArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rides.
     * @param {RideDeleteManyArgs} args - Arguments to filter Rides to delete.
     * @example
     * // Delete a few Rides
     * const { count } = await prisma.ride.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RideDeleteManyArgs>(args?: SelectSubset<T, RideDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rides
     * const ride = await prisma.ride.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RideUpdateManyArgs>(args: SelectSubset<T, RideUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rides and returns the data updated in the database.
     * @param {RideUpdateManyAndReturnArgs} args - Arguments to update many Rides.
     * @example
     * // Update many Rides
     * const ride = await prisma.ride.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rides and only return the `id`
     * const rideWithIdOnly = await prisma.ride.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RideUpdateManyAndReturnArgs>(args: SelectSubset<T, RideUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ride.
     * @param {RideUpsertArgs} args - Arguments to update or create a Ride.
     * @example
     * // Update or create a Ride
     * const ride = await prisma.ride.upsert({
     *   create: {
     *     // ... data to create a Ride
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ride we want to update
     *   }
     * })
     */
    upsert<T extends RideUpsertArgs>(args: SelectSubset<T, RideUpsertArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCountArgs} args - Arguments to filter Rides to count.
     * @example
     * // Count the number of Rides
     * const count = await prisma.ride.count({
     *   where: {
     *     // ... the filter for the Rides we want to count
     *   }
     * })
    **/
    count<T extends RideCountArgs>(
      args?: Subset<T, RideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RideAggregateArgs>(args: Subset<T, RideAggregateArgs>): Prisma.PrismaPromise<GetRideAggregateType<T>>

    /**
     * Group by Ride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RideGroupByArgs['orderBy'] }
        : { orderBy?: RideGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRideGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ride model
   */
  readonly fields: RideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ride.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RideClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    passenger<T extends PassengerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PassengerDefaultArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    driver<T extends Ride$driverArgs<ExtArgs> = {}>(args?: Subset<T, Ride$driverArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    vehicle<T extends Ride$vehicleArgs<ExtArgs> = {}>(args?: Subset<T, Ride$vehicleArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ratings<T extends Ride$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, Ride$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payment<T extends Ride$paymentArgs<ExtArgs> = {}>(args?: Subset<T, Ride$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    locations<T extends Ride$locationsArgs<ExtArgs> = {}>(args?: Subset<T, Ride$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ride model
   */
  interface RideFieldRefs {
    readonly id: FieldRef<"Ride", 'String'>
    readonly passengerId: FieldRef<"Ride", 'String'>
    readonly driverId: FieldRef<"Ride", 'String'>
    readonly vehicleId: FieldRef<"Ride", 'String'>
    readonly status: FieldRef<"Ride", 'RideStatus'>
    readonly requestTime: FieldRef<"Ride", 'DateTime'>
    readonly acceptTime: FieldRef<"Ride", 'DateTime'>
    readonly pickupTime: FieldRef<"Ride", 'DateTime'>
    readonly dropOffTime: FieldRef<"Ride", 'DateTime'>
    readonly originAddress: FieldRef<"Ride", 'String'>
    readonly originLatitude: FieldRef<"Ride", 'Float'>
    readonly originLongitude: FieldRef<"Ride", 'Float'>
    readonly destinationAddress: FieldRef<"Ride", 'String'>
    readonly destinationLatitude: FieldRef<"Ride", 'Float'>
    readonly destinationLongitude: FieldRef<"Ride", 'Float'>
    readonly estimatedDuration: FieldRef<"Ride", 'Int'>
    readonly actualDuration: FieldRef<"Ride", 'Int'>
    readonly estimatedDistance: FieldRef<"Ride", 'Float'>
    readonly actualDistance: FieldRef<"Ride", 'Float'>
    readonly basePrice: FieldRef<"Ride", 'Float'>
    readonly finalPrice: FieldRef<"Ride", 'Float'>
    readonly currency: FieldRef<"Ride", 'String'>
    readonly paymentStatus: FieldRef<"Ride", 'PaymentStatus'>
    readonly paymentMethodId: FieldRef<"Ride", 'String'>
    readonly cancellationReason: FieldRef<"Ride", 'String'>
    readonly cancellationTime: FieldRef<"Ride", 'DateTime'>
    readonly cancellationFee: FieldRef<"Ride", 'Float'>
    readonly isFemaleOnlyRide: FieldRef<"Ride", 'Boolean'>
    readonly specialRequirements: FieldRef<"Ride", 'String'>
    readonly baggageQuantity: FieldRef<"Ride", 'Int'>
    readonly rideType: FieldRef<"Ride", 'RideType'>
    readonly scheduledTime: FieldRef<"Ride", 'DateTime'>
    readonly createdAt: FieldRef<"Ride", 'DateTime'>
    readonly updatedAt: FieldRef<"Ride", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ride findUnique
   */
  export type RideFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Ride to fetch.
     */
    where: RideWhereUniqueInput
  }

  /**
   * Ride findUniqueOrThrow
   */
  export type RideFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Ride to fetch.
     */
    where: RideWhereUniqueInput
  }

  /**
   * Ride findFirst
   */
  export type RideFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Ride to fetch.
     */
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rides.
     */
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rides.
     */
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * Ride findFirstOrThrow
   */
  export type RideFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Ride to fetch.
     */
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rides.
     */
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rides.
     */
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * Ride findMany
   */
  export type RideFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Rides to fetch.
     */
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rides.
     */
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     */
    skip?: number
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * Ride create
   */
  export type RideCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * The data needed to create a Ride.
     */
    data: XOR<RideCreateInput, RideUncheckedCreateInput>
  }

  /**
   * Ride createMany
   */
  export type RideCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rides.
     */
    data: RideCreateManyInput | RideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ride createManyAndReturn
   */
  export type RideCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * The data used to create many Rides.
     */
    data: RideCreateManyInput | RideCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ride update
   */
  export type RideUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * The data needed to update a Ride.
     */
    data: XOR<RideUpdateInput, RideUncheckedUpdateInput>
    /**
     * Choose, which Ride to update.
     */
    where: RideWhereUniqueInput
  }

  /**
   * Ride updateMany
   */
  export type RideUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rides.
     */
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyInput>
    /**
     * Filter which Rides to update
     */
    where?: RideWhereInput
    /**
     * Limit how many Rides to update.
     */
    limit?: number
  }

  /**
   * Ride updateManyAndReturn
   */
  export type RideUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * The data used to update Rides.
     */
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyInput>
    /**
     * Filter which Rides to update
     */
    where?: RideWhereInput
    /**
     * Limit how many Rides to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ride upsert
   */
  export type RideUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * The filter to search for the Ride to update in case it exists.
     */
    where: RideWhereUniqueInput
    /**
     * In case the Ride found by the `where` argument doesn't exist, create a new Ride with this data.
     */
    create: XOR<RideCreateInput, RideUncheckedCreateInput>
    /**
     * In case the Ride was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RideUpdateInput, RideUncheckedUpdateInput>
  }

  /**
   * Ride delete
   */
  export type RideDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter which Ride to delete.
     */
    where: RideWhereUniqueInput
  }

  /**
   * Ride deleteMany
   */
  export type RideDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rides to delete
     */
    where?: RideWhereInput
    /**
     * Limit how many Rides to delete.
     */
    limit?: number
  }

  /**
   * Ride.driver
   */
  export type Ride$driverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    where?: DriverWhereInput
  }

  /**
   * Ride.vehicle
   */
  export type Ride$vehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
  }

  /**
   * Ride.ratings
   */
  export type Ride$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Ride.payment
   */
  export type Ride$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }

  /**
   * Ride.locations
   */
  export type Ride$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    where?: RideLocationWhereInput
    orderBy?: RideLocationOrderByWithRelationInput | RideLocationOrderByWithRelationInput[]
    cursor?: RideLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RideLocationScalarFieldEnum | RideLocationScalarFieldEnum[]
  }

  /**
   * Ride without action
   */
  export type RideDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    rideId: string | null
    amount: number | null
    currency: string | null
    status: $Enums.PaymentStatus | null
    paymentMethod: string | null
    paymentIntentId: string | null
    stripeCustomerId: string | null
    receiptUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    rideId: string | null
    amount: number | null
    currency: string | null
    status: $Enums.PaymentStatus | null
    paymentMethod: string | null
    paymentIntentId: string | null
    stripeCustomerId: string | null
    receiptUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    rideId: number
    amount: number
    currency: number
    status: number
    paymentMethod: number
    paymentIntentId: number
    stripeCustomerId: number
    receiptUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    rideId?: true
    amount?: true
    currency?: true
    status?: true
    paymentMethod?: true
    paymentIntentId?: true
    stripeCustomerId?: true
    receiptUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    rideId?: true
    amount?: true
    currency?: true
    status?: true
    paymentMethod?: true
    paymentIntentId?: true
    stripeCustomerId?: true
    receiptUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    rideId?: true
    amount?: true
    currency?: true
    status?: true
    paymentMethod?: true
    paymentIntentId?: true
    stripeCustomerId?: true
    receiptUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    rideId: string
    amount: number
    currency: string
    status: $Enums.PaymentStatus
    paymentMethod: string
    paymentIntentId: string | null
    stripeCustomerId: string | null
    receiptUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    paymentIntentId?: boolean
    stripeCustomerId?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    paymentIntentId?: boolean
    stripeCustomerId?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    paymentIntentId?: boolean
    stripeCustomerId?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    rideId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    paymentIntentId?: boolean
    stripeCustomerId?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rideId" | "amount" | "currency" | "status" | "paymentMethod" | "paymentIntentId" | "stripeCustomerId" | "receiptUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      ride: Prisma.$RidePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rideId: string
      amount: number
      currency: string
      status: $Enums.PaymentStatus
      paymentMethod: string
      paymentIntentId: string | null
      stripeCustomerId: string | null
      receiptUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ride<T extends RideDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RideDefaultArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly rideId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly paymentMethod: FieldRef<"Payment", 'String'>
    readonly paymentIntentId: FieldRef<"Payment", 'String'>
    readonly stripeCustomerId: FieldRef<"Payment", 'String'>
    readonly receiptUrl: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Rating
   */

  export type AggregateRating = {
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  export type RatingAvgAggregateOutputType = {
    rating: number | null
    cleanliness: number | null
    drivingSkill: number | null
    courtesy: number | null
  }

  export type RatingSumAggregateOutputType = {
    rating: number | null
    cleanliness: number | null
    drivingSkill: number | null
    courtesy: number | null
  }

  export type RatingMinAggregateOutputType = {
    id: string | null
    rideId: string | null
    ratedByUserId: string | null
    ratedUserId: string | null
    rating: number | null
    review: string | null
    cleanliness: number | null
    drivingSkill: number | null
    courtesy: number | null
    createdAt: Date | null
  }

  export type RatingMaxAggregateOutputType = {
    id: string | null
    rideId: string | null
    ratedByUserId: string | null
    ratedUserId: string | null
    rating: number | null
    review: string | null
    cleanliness: number | null
    drivingSkill: number | null
    courtesy: number | null
    createdAt: Date | null
  }

  export type RatingCountAggregateOutputType = {
    id: number
    rideId: number
    ratedByUserId: number
    ratedUserId: number
    rating: number
    review: number
    cleanliness: number
    drivingSkill: number
    courtesy: number
    createdAt: number
    _all: number
  }


  export type RatingAvgAggregateInputType = {
    rating?: true
    cleanliness?: true
    drivingSkill?: true
    courtesy?: true
  }

  export type RatingSumAggregateInputType = {
    rating?: true
    cleanliness?: true
    drivingSkill?: true
    courtesy?: true
  }

  export type RatingMinAggregateInputType = {
    id?: true
    rideId?: true
    ratedByUserId?: true
    ratedUserId?: true
    rating?: true
    review?: true
    cleanliness?: true
    drivingSkill?: true
    courtesy?: true
    createdAt?: true
  }

  export type RatingMaxAggregateInputType = {
    id?: true
    rideId?: true
    ratedByUserId?: true
    ratedUserId?: true
    rating?: true
    review?: true
    cleanliness?: true
    drivingSkill?: true
    courtesy?: true
    createdAt?: true
  }

  export type RatingCountAggregateInputType = {
    id?: true
    rideId?: true
    ratedByUserId?: true
    ratedUserId?: true
    rating?: true
    review?: true
    cleanliness?: true
    drivingSkill?: true
    courtesy?: true
    createdAt?: true
    _all?: true
  }

  export type RatingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rating to aggregate.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ratings
    **/
    _count?: true | RatingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RatingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RatingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RatingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RatingMaxAggregateInputType
  }

  export type GetRatingAggregateType<T extends RatingAggregateArgs> = {
        [P in keyof T & keyof AggregateRating]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRating[P]>
      : GetScalarType<T[P], AggregateRating[P]>
  }




  export type RatingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithAggregationInput | RatingOrderByWithAggregationInput[]
    by: RatingScalarFieldEnum[] | RatingScalarFieldEnum
    having?: RatingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RatingCountAggregateInputType | true
    _avg?: RatingAvgAggregateInputType
    _sum?: RatingSumAggregateInputType
    _min?: RatingMinAggregateInputType
    _max?: RatingMaxAggregateInputType
  }

  export type RatingGroupByOutputType = {
    id: string
    rideId: string
    ratedByUserId: string
    ratedUserId: string
    rating: number
    review: string | null
    cleanliness: number | null
    drivingSkill: number | null
    courtesy: number | null
    createdAt: Date
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  type GetRatingGroupByPayload<T extends RatingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RatingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RatingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RatingGroupByOutputType[P]>
            : GetScalarType<T[P], RatingGroupByOutputType[P]>
        }
      >
    >


  export type RatingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    ratedByUserId?: boolean
    ratedUserId?: boolean
    rating?: boolean
    review?: boolean
    cleanliness?: boolean
    drivingSkill?: boolean
    courtesy?: boolean
    createdAt?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
    ratedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    ratedByUserId?: boolean
    ratedUserId?: boolean
    rating?: boolean
    review?: boolean
    cleanliness?: boolean
    drivingSkill?: boolean
    courtesy?: boolean
    createdAt?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
    ratedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    ratedByUserId?: boolean
    ratedUserId?: boolean
    rating?: boolean
    review?: boolean
    cleanliness?: boolean
    drivingSkill?: boolean
    courtesy?: boolean
    createdAt?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
    ratedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectScalar = {
    id?: boolean
    rideId?: boolean
    ratedByUserId?: boolean
    ratedUserId?: boolean
    rating?: boolean
    review?: boolean
    cleanliness?: boolean
    drivingSkill?: boolean
    courtesy?: boolean
    createdAt?: boolean
  }

  export type RatingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rideId" | "ratedByUserId" | "ratedUserId" | "rating" | "review" | "cleanliness" | "drivingSkill" | "courtesy" | "createdAt", ExtArgs["result"]["rating"]>
  export type RatingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
    ratedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RatingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
    ratedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RatingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
    ratedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RatingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rating"
    objects: {
      ride: Prisma.$RidePayload<ExtArgs>
      ratedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rideId: string
      ratedByUserId: string
      ratedUserId: string
      rating: number
      review: string | null
      cleanliness: number | null
      drivingSkill: number | null
      courtesy: number | null
      createdAt: Date
    }, ExtArgs["result"]["rating"]>
    composites: {}
  }

  type RatingGetPayload<S extends boolean | null | undefined | RatingDefaultArgs> = $Result.GetResult<Prisma.$RatingPayload, S>

  type RatingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RatingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RatingCountAggregateInputType | true
    }

  export interface RatingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rating'], meta: { name: 'Rating' } }
    /**
     * Find zero or one Rating that matches the filter.
     * @param {RatingFindUniqueArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RatingFindUniqueArgs>(args: SelectSubset<T, RatingFindUniqueArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rating that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RatingFindUniqueOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RatingFindUniqueOrThrowArgs>(args: SelectSubset<T, RatingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RatingFindFirstArgs>(args?: SelectSubset<T, RatingFindFirstArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RatingFindFirstOrThrowArgs>(args?: SelectSubset<T, RatingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ratings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ratings
     * const ratings = await prisma.rating.findMany()
     * 
     * // Get first 10 Ratings
     * const ratings = await prisma.rating.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ratingWithIdOnly = await prisma.rating.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RatingFindManyArgs>(args?: SelectSubset<T, RatingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rating.
     * @param {RatingCreateArgs} args - Arguments to create a Rating.
     * @example
     * // Create one Rating
     * const Rating = await prisma.rating.create({
     *   data: {
     *     // ... data to create a Rating
     *   }
     * })
     * 
     */
    create<T extends RatingCreateArgs>(args: SelectSubset<T, RatingCreateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ratings.
     * @param {RatingCreateManyArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RatingCreateManyArgs>(args?: SelectSubset<T, RatingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ratings and returns the data saved in the database.
     * @param {RatingCreateManyAndReturnArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ratings and only return the `id`
     * const ratingWithIdOnly = await prisma.rating.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RatingCreateManyAndReturnArgs>(args?: SelectSubset<T, RatingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rating.
     * @param {RatingDeleteArgs} args - Arguments to delete one Rating.
     * @example
     * // Delete one Rating
     * const Rating = await prisma.rating.delete({
     *   where: {
     *     // ... filter to delete one Rating
     *   }
     * })
     * 
     */
    delete<T extends RatingDeleteArgs>(args: SelectSubset<T, RatingDeleteArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rating.
     * @param {RatingUpdateArgs} args - Arguments to update one Rating.
     * @example
     * // Update one Rating
     * const rating = await prisma.rating.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RatingUpdateArgs>(args: SelectSubset<T, RatingUpdateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ratings.
     * @param {RatingDeleteManyArgs} args - Arguments to filter Ratings to delete.
     * @example
     * // Delete a few Ratings
     * const { count } = await prisma.rating.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RatingDeleteManyArgs>(args?: SelectSubset<T, RatingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RatingUpdateManyArgs>(args: SelectSubset<T, RatingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings and returns the data updated in the database.
     * @param {RatingUpdateManyAndReturnArgs} args - Arguments to update many Ratings.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ratings and only return the `id`
     * const ratingWithIdOnly = await prisma.rating.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RatingUpdateManyAndReturnArgs>(args: SelectSubset<T, RatingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rating.
     * @param {RatingUpsertArgs} args - Arguments to update or create a Rating.
     * @example
     * // Update or create a Rating
     * const rating = await prisma.rating.upsert({
     *   create: {
     *     // ... data to create a Rating
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rating we want to update
     *   }
     * })
     */
    upsert<T extends RatingUpsertArgs>(args: SelectSubset<T, RatingUpsertArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingCountArgs} args - Arguments to filter Ratings to count.
     * @example
     * // Count the number of Ratings
     * const count = await prisma.rating.count({
     *   where: {
     *     // ... the filter for the Ratings we want to count
     *   }
     * })
    **/
    count<T extends RatingCountArgs>(
      args?: Subset<T, RatingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RatingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RatingAggregateArgs>(args: Subset<T, RatingAggregateArgs>): Prisma.PrismaPromise<GetRatingAggregateType<T>>

    /**
     * Group by Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RatingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RatingGroupByArgs['orderBy'] }
        : { orderBy?: RatingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RatingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rating model
   */
  readonly fields: RatingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rating.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RatingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ride<T extends RideDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RideDefaultArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ratedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Rating model
   */
  interface RatingFieldRefs {
    readonly id: FieldRef<"Rating", 'String'>
    readonly rideId: FieldRef<"Rating", 'String'>
    readonly ratedByUserId: FieldRef<"Rating", 'String'>
    readonly ratedUserId: FieldRef<"Rating", 'String'>
    readonly rating: FieldRef<"Rating", 'Float'>
    readonly review: FieldRef<"Rating", 'String'>
    readonly cleanliness: FieldRef<"Rating", 'Float'>
    readonly drivingSkill: FieldRef<"Rating", 'Float'>
    readonly courtesy: FieldRef<"Rating", 'Float'>
    readonly createdAt: FieldRef<"Rating", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rating findUnique
   */
  export type RatingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findUniqueOrThrow
   */
  export type RatingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findFirst
   */
  export type RatingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findFirstOrThrow
   */
  export type RatingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findMany
   */
  export type RatingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Ratings to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating create
   */
  export type RatingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to create a Rating.
     */
    data: XOR<RatingCreateInput, RatingUncheckedCreateInput>
  }

  /**
   * Rating createMany
   */
  export type RatingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rating createManyAndReturn
   */
  export type RatingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating update
   */
  export type RatingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to update a Rating.
     */
    data: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
    /**
     * Choose, which Rating to update.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating updateMany
   */
  export type RatingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
  }

  /**
   * Rating updateManyAndReturn
   */
  export type RatingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating upsert
   */
  export type RatingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The filter to search for the Rating to update in case it exists.
     */
    where: RatingWhereUniqueInput
    /**
     * In case the Rating found by the `where` argument doesn't exist, create a new Rating with this data.
     */
    create: XOR<RatingCreateInput, RatingUncheckedCreateInput>
    /**
     * In case the Rating was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
  }

  /**
   * Rating delete
   */
  export type RatingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter which Rating to delete.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating deleteMany
   */
  export type RatingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ratings to delete
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to delete.
     */
    limit?: number
  }

  /**
   * Rating without action
   */
  export type RatingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
  }


  /**
   * Model RideLocation
   */

  export type AggregateRideLocation = {
    _count: RideLocationCountAggregateOutputType | null
    _avg: RideLocationAvgAggregateOutputType | null
    _sum: RideLocationSumAggregateOutputType | null
    _min: RideLocationMinAggregateOutputType | null
    _max: RideLocationMaxAggregateOutputType | null
  }

  export type RideLocationAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    bearing: number | null
    accuracy: number | null
  }

  export type RideLocationSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    speed: number | null
    bearing: number | null
    accuracy: number | null
  }

  export type RideLocationMinAggregateOutputType = {
    id: string | null
    rideId: string | null
    latitude: number | null
    longitude: number | null
    timestamp: Date | null
    speed: number | null
    bearing: number | null
    accuracy: number | null
    userType: $Enums.UserType | null
  }

  export type RideLocationMaxAggregateOutputType = {
    id: string | null
    rideId: string | null
    latitude: number | null
    longitude: number | null
    timestamp: Date | null
    speed: number | null
    bearing: number | null
    accuracy: number | null
    userType: $Enums.UserType | null
  }

  export type RideLocationCountAggregateOutputType = {
    id: number
    rideId: number
    latitude: number
    longitude: number
    timestamp: number
    speed: number
    bearing: number
    accuracy: number
    userType: number
    _all: number
  }


  export type RideLocationAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    bearing?: true
    accuracy?: true
  }

  export type RideLocationSumAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    bearing?: true
    accuracy?: true
  }

  export type RideLocationMinAggregateInputType = {
    id?: true
    rideId?: true
    latitude?: true
    longitude?: true
    timestamp?: true
    speed?: true
    bearing?: true
    accuracy?: true
    userType?: true
  }

  export type RideLocationMaxAggregateInputType = {
    id?: true
    rideId?: true
    latitude?: true
    longitude?: true
    timestamp?: true
    speed?: true
    bearing?: true
    accuracy?: true
    userType?: true
  }

  export type RideLocationCountAggregateInputType = {
    id?: true
    rideId?: true
    latitude?: true
    longitude?: true
    timestamp?: true
    speed?: true
    bearing?: true
    accuracy?: true
    userType?: true
    _all?: true
  }

  export type RideLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RideLocation to aggregate.
     */
    where?: RideLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideLocations to fetch.
     */
    orderBy?: RideLocationOrderByWithRelationInput | RideLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RideLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RideLocations
    **/
    _count?: true | RideLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RideLocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RideLocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RideLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RideLocationMaxAggregateInputType
  }

  export type GetRideLocationAggregateType<T extends RideLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateRideLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRideLocation[P]>
      : GetScalarType<T[P], AggregateRideLocation[P]>
  }




  export type RideLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideLocationWhereInput
    orderBy?: RideLocationOrderByWithAggregationInput | RideLocationOrderByWithAggregationInput[]
    by: RideLocationScalarFieldEnum[] | RideLocationScalarFieldEnum
    having?: RideLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RideLocationCountAggregateInputType | true
    _avg?: RideLocationAvgAggregateInputType
    _sum?: RideLocationSumAggregateInputType
    _min?: RideLocationMinAggregateInputType
    _max?: RideLocationMaxAggregateInputType
  }

  export type RideLocationGroupByOutputType = {
    id: string
    rideId: string
    latitude: number
    longitude: number
    timestamp: Date
    speed: number | null
    bearing: number | null
    accuracy: number | null
    userType: $Enums.UserType
    _count: RideLocationCountAggregateOutputType | null
    _avg: RideLocationAvgAggregateOutputType | null
    _sum: RideLocationSumAggregateOutputType | null
    _min: RideLocationMinAggregateOutputType | null
    _max: RideLocationMaxAggregateOutputType | null
  }

  type GetRideLocationGroupByPayload<T extends RideLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RideLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RideLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RideLocationGroupByOutputType[P]>
            : GetScalarType<T[P], RideLocationGroupByOutputType[P]>
        }
      >
    >


  export type RideLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    latitude?: boolean
    longitude?: boolean
    timestamp?: boolean
    speed?: boolean
    bearing?: boolean
    accuracy?: boolean
    userType?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rideLocation"]>

  export type RideLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    latitude?: boolean
    longitude?: boolean
    timestamp?: boolean
    speed?: boolean
    bearing?: boolean
    accuracy?: boolean
    userType?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rideLocation"]>

  export type RideLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    latitude?: boolean
    longitude?: boolean
    timestamp?: boolean
    speed?: boolean
    bearing?: boolean
    accuracy?: boolean
    userType?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rideLocation"]>

  export type RideLocationSelectScalar = {
    id?: boolean
    rideId?: boolean
    latitude?: boolean
    longitude?: boolean
    timestamp?: boolean
    speed?: boolean
    bearing?: boolean
    accuracy?: boolean
    userType?: boolean
  }

  export type RideLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rideId" | "latitude" | "longitude" | "timestamp" | "speed" | "bearing" | "accuracy" | "userType", ExtArgs["result"]["rideLocation"]>
  export type RideLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }
  export type RideLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }
  export type RideLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
  }

  export type $RideLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RideLocation"
    objects: {
      ride: Prisma.$RidePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rideId: string
      latitude: number
      longitude: number
      timestamp: Date
      speed: number | null
      bearing: number | null
      accuracy: number | null
      userType: $Enums.UserType
    }, ExtArgs["result"]["rideLocation"]>
    composites: {}
  }

  type RideLocationGetPayload<S extends boolean | null | undefined | RideLocationDefaultArgs> = $Result.GetResult<Prisma.$RideLocationPayload, S>

  type RideLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RideLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RideLocationCountAggregateInputType | true
    }

  export interface RideLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RideLocation'], meta: { name: 'RideLocation' } }
    /**
     * Find zero or one RideLocation that matches the filter.
     * @param {RideLocationFindUniqueArgs} args - Arguments to find a RideLocation
     * @example
     * // Get one RideLocation
     * const rideLocation = await prisma.rideLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RideLocationFindUniqueArgs>(args: SelectSubset<T, RideLocationFindUniqueArgs<ExtArgs>>): Prisma__RideLocationClient<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RideLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RideLocationFindUniqueOrThrowArgs} args - Arguments to find a RideLocation
     * @example
     * // Get one RideLocation
     * const rideLocation = await prisma.rideLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RideLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, RideLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RideLocationClient<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RideLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideLocationFindFirstArgs} args - Arguments to find a RideLocation
     * @example
     * // Get one RideLocation
     * const rideLocation = await prisma.rideLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RideLocationFindFirstArgs>(args?: SelectSubset<T, RideLocationFindFirstArgs<ExtArgs>>): Prisma__RideLocationClient<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RideLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideLocationFindFirstOrThrowArgs} args - Arguments to find a RideLocation
     * @example
     * // Get one RideLocation
     * const rideLocation = await prisma.rideLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RideLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, RideLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RideLocationClient<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RideLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RideLocations
     * const rideLocations = await prisma.rideLocation.findMany()
     * 
     * // Get first 10 RideLocations
     * const rideLocations = await prisma.rideLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rideLocationWithIdOnly = await prisma.rideLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RideLocationFindManyArgs>(args?: SelectSubset<T, RideLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RideLocation.
     * @param {RideLocationCreateArgs} args - Arguments to create a RideLocation.
     * @example
     * // Create one RideLocation
     * const RideLocation = await prisma.rideLocation.create({
     *   data: {
     *     // ... data to create a RideLocation
     *   }
     * })
     * 
     */
    create<T extends RideLocationCreateArgs>(args: SelectSubset<T, RideLocationCreateArgs<ExtArgs>>): Prisma__RideLocationClient<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RideLocations.
     * @param {RideLocationCreateManyArgs} args - Arguments to create many RideLocations.
     * @example
     * // Create many RideLocations
     * const rideLocation = await prisma.rideLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RideLocationCreateManyArgs>(args?: SelectSubset<T, RideLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RideLocations and returns the data saved in the database.
     * @param {RideLocationCreateManyAndReturnArgs} args - Arguments to create many RideLocations.
     * @example
     * // Create many RideLocations
     * const rideLocation = await prisma.rideLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RideLocations and only return the `id`
     * const rideLocationWithIdOnly = await prisma.rideLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RideLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, RideLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RideLocation.
     * @param {RideLocationDeleteArgs} args - Arguments to delete one RideLocation.
     * @example
     * // Delete one RideLocation
     * const RideLocation = await prisma.rideLocation.delete({
     *   where: {
     *     // ... filter to delete one RideLocation
     *   }
     * })
     * 
     */
    delete<T extends RideLocationDeleteArgs>(args: SelectSubset<T, RideLocationDeleteArgs<ExtArgs>>): Prisma__RideLocationClient<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RideLocation.
     * @param {RideLocationUpdateArgs} args - Arguments to update one RideLocation.
     * @example
     * // Update one RideLocation
     * const rideLocation = await prisma.rideLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RideLocationUpdateArgs>(args: SelectSubset<T, RideLocationUpdateArgs<ExtArgs>>): Prisma__RideLocationClient<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RideLocations.
     * @param {RideLocationDeleteManyArgs} args - Arguments to filter RideLocations to delete.
     * @example
     * // Delete a few RideLocations
     * const { count } = await prisma.rideLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RideLocationDeleteManyArgs>(args?: SelectSubset<T, RideLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RideLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RideLocations
     * const rideLocation = await prisma.rideLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RideLocationUpdateManyArgs>(args: SelectSubset<T, RideLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RideLocations and returns the data updated in the database.
     * @param {RideLocationUpdateManyAndReturnArgs} args - Arguments to update many RideLocations.
     * @example
     * // Update many RideLocations
     * const rideLocation = await prisma.rideLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RideLocations and only return the `id`
     * const rideLocationWithIdOnly = await prisma.rideLocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RideLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, RideLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RideLocation.
     * @param {RideLocationUpsertArgs} args - Arguments to update or create a RideLocation.
     * @example
     * // Update or create a RideLocation
     * const rideLocation = await prisma.rideLocation.upsert({
     *   create: {
     *     // ... data to create a RideLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RideLocation we want to update
     *   }
     * })
     */
    upsert<T extends RideLocationUpsertArgs>(args: SelectSubset<T, RideLocationUpsertArgs<ExtArgs>>): Prisma__RideLocationClient<$Result.GetResult<Prisma.$RideLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RideLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideLocationCountArgs} args - Arguments to filter RideLocations to count.
     * @example
     * // Count the number of RideLocations
     * const count = await prisma.rideLocation.count({
     *   where: {
     *     // ... the filter for the RideLocations we want to count
     *   }
     * })
    **/
    count<T extends RideLocationCountArgs>(
      args?: Subset<T, RideLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RideLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RideLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RideLocationAggregateArgs>(args: Subset<T, RideLocationAggregateArgs>): Prisma.PrismaPromise<GetRideLocationAggregateType<T>>

    /**
     * Group by RideLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RideLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RideLocationGroupByArgs['orderBy'] }
        : { orderBy?: RideLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RideLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRideLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RideLocation model
   */
  readonly fields: RideLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RideLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RideLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ride<T extends RideDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RideDefaultArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RideLocation model
   */
  interface RideLocationFieldRefs {
    readonly id: FieldRef<"RideLocation", 'String'>
    readonly rideId: FieldRef<"RideLocation", 'String'>
    readonly latitude: FieldRef<"RideLocation", 'Float'>
    readonly longitude: FieldRef<"RideLocation", 'Float'>
    readonly timestamp: FieldRef<"RideLocation", 'DateTime'>
    readonly speed: FieldRef<"RideLocation", 'Float'>
    readonly bearing: FieldRef<"RideLocation", 'Float'>
    readonly accuracy: FieldRef<"RideLocation", 'Float'>
    readonly userType: FieldRef<"RideLocation", 'UserType'>
  }
    

  // Custom InputTypes
  /**
   * RideLocation findUnique
   */
  export type RideLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    /**
     * Filter, which RideLocation to fetch.
     */
    where: RideLocationWhereUniqueInput
  }

  /**
   * RideLocation findUniqueOrThrow
   */
  export type RideLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    /**
     * Filter, which RideLocation to fetch.
     */
    where: RideLocationWhereUniqueInput
  }

  /**
   * RideLocation findFirst
   */
  export type RideLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    /**
     * Filter, which RideLocation to fetch.
     */
    where?: RideLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideLocations to fetch.
     */
    orderBy?: RideLocationOrderByWithRelationInput | RideLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RideLocations.
     */
    cursor?: RideLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RideLocations.
     */
    distinct?: RideLocationScalarFieldEnum | RideLocationScalarFieldEnum[]
  }

  /**
   * RideLocation findFirstOrThrow
   */
  export type RideLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    /**
     * Filter, which RideLocation to fetch.
     */
    where?: RideLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideLocations to fetch.
     */
    orderBy?: RideLocationOrderByWithRelationInput | RideLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RideLocations.
     */
    cursor?: RideLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RideLocations.
     */
    distinct?: RideLocationScalarFieldEnum | RideLocationScalarFieldEnum[]
  }

  /**
   * RideLocation findMany
   */
  export type RideLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    /**
     * Filter, which RideLocations to fetch.
     */
    where?: RideLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideLocations to fetch.
     */
    orderBy?: RideLocationOrderByWithRelationInput | RideLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RideLocations.
     */
    cursor?: RideLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideLocations.
     */
    skip?: number
    distinct?: RideLocationScalarFieldEnum | RideLocationScalarFieldEnum[]
  }

  /**
   * RideLocation create
   */
  export type RideLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a RideLocation.
     */
    data: XOR<RideLocationCreateInput, RideLocationUncheckedCreateInput>
  }

  /**
   * RideLocation createMany
   */
  export type RideLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RideLocations.
     */
    data: RideLocationCreateManyInput | RideLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RideLocation createManyAndReturn
   */
  export type RideLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * The data used to create many RideLocations.
     */
    data: RideLocationCreateManyInput | RideLocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RideLocation update
   */
  export type RideLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a RideLocation.
     */
    data: XOR<RideLocationUpdateInput, RideLocationUncheckedUpdateInput>
    /**
     * Choose, which RideLocation to update.
     */
    where: RideLocationWhereUniqueInput
  }

  /**
   * RideLocation updateMany
   */
  export type RideLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RideLocations.
     */
    data: XOR<RideLocationUpdateManyMutationInput, RideLocationUncheckedUpdateManyInput>
    /**
     * Filter which RideLocations to update
     */
    where?: RideLocationWhereInput
    /**
     * Limit how many RideLocations to update.
     */
    limit?: number
  }

  /**
   * RideLocation updateManyAndReturn
   */
  export type RideLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * The data used to update RideLocations.
     */
    data: XOR<RideLocationUpdateManyMutationInput, RideLocationUncheckedUpdateManyInput>
    /**
     * Filter which RideLocations to update
     */
    where?: RideLocationWhereInput
    /**
     * Limit how many RideLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RideLocation upsert
   */
  export type RideLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the RideLocation to update in case it exists.
     */
    where: RideLocationWhereUniqueInput
    /**
     * In case the RideLocation found by the `where` argument doesn't exist, create a new RideLocation with this data.
     */
    create: XOR<RideLocationCreateInput, RideLocationUncheckedCreateInput>
    /**
     * In case the RideLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RideLocationUpdateInput, RideLocationUncheckedUpdateInput>
  }

  /**
   * RideLocation delete
   */
  export type RideLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
    /**
     * Filter which RideLocation to delete.
     */
    where: RideLocationWhereUniqueInput
  }

  /**
   * RideLocation deleteMany
   */
  export type RideLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RideLocations to delete
     */
    where?: RideLocationWhereInput
    /**
     * Limit how many RideLocations to delete.
     */
    limit?: number
  }

  /**
   * RideLocation without action
   */
  export type RideLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideLocation
     */
    select?: RideLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideLocation
     */
    omit?: RideLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideLocationInclude<ExtArgs> | null
  }


  /**
   * Model DriverDocument
   */

  export type AggregateDriverDocument = {
    _count: DriverDocumentCountAggregateOutputType | null
    _min: DriverDocumentMinAggregateOutputType | null
    _max: DriverDocumentMaxAggregateOutputType | null
  }

  export type DriverDocumentMinAggregateOutputType = {
    id: string | null
    driverId: string | null
    documentType: $Enums.DocumentType | null
    documentNumber: string | null
    issuedDate: Date | null
    expiryDate: Date | null
    isVerified: boolean | null
    verificationDate: Date | null
    documentUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverDocumentMaxAggregateOutputType = {
    id: string | null
    driverId: string | null
    documentType: $Enums.DocumentType | null
    documentNumber: string | null
    issuedDate: Date | null
    expiryDate: Date | null
    isVerified: boolean | null
    verificationDate: Date | null
    documentUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverDocumentCountAggregateOutputType = {
    id: number
    driverId: number
    documentType: number
    documentNumber: number
    issuedDate: number
    expiryDate: number
    isVerified: number
    verificationDate: number
    documentUrl: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DriverDocumentMinAggregateInputType = {
    id?: true
    driverId?: true
    documentType?: true
    documentNumber?: true
    issuedDate?: true
    expiryDate?: true
    isVerified?: true
    verificationDate?: true
    documentUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverDocumentMaxAggregateInputType = {
    id?: true
    driverId?: true
    documentType?: true
    documentNumber?: true
    issuedDate?: true
    expiryDate?: true
    isVerified?: true
    verificationDate?: true
    documentUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverDocumentCountAggregateInputType = {
    id?: true
    driverId?: true
    documentType?: true
    documentNumber?: true
    issuedDate?: true
    expiryDate?: true
    isVerified?: true
    verificationDate?: true
    documentUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DriverDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriverDocument to aggregate.
     */
    where?: DriverDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverDocuments to fetch.
     */
    orderBy?: DriverDocumentOrderByWithRelationInput | DriverDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DriverDocuments
    **/
    _count?: true | DriverDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverDocumentMaxAggregateInputType
  }

  export type GetDriverDocumentAggregateType<T extends DriverDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDriverDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriverDocument[P]>
      : GetScalarType<T[P], AggregateDriverDocument[P]>
  }




  export type DriverDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverDocumentWhereInput
    orderBy?: DriverDocumentOrderByWithAggregationInput | DriverDocumentOrderByWithAggregationInput[]
    by: DriverDocumentScalarFieldEnum[] | DriverDocumentScalarFieldEnum
    having?: DriverDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverDocumentCountAggregateInputType | true
    _min?: DriverDocumentMinAggregateInputType
    _max?: DriverDocumentMaxAggregateInputType
  }

  export type DriverDocumentGroupByOutputType = {
    id: string
    driverId: string
    documentType: $Enums.DocumentType
    documentNumber: string | null
    issuedDate: Date | null
    expiryDate: Date | null
    isVerified: boolean
    verificationDate: Date | null
    documentUrl: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: DriverDocumentCountAggregateOutputType | null
    _min: DriverDocumentMinAggregateOutputType | null
    _max: DriverDocumentMaxAggregateOutputType | null
  }

  type GetDriverDocumentGroupByPayload<T extends DriverDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DriverDocumentGroupByOutputType[P]>
        }
      >
    >


  export type DriverDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuedDate?: boolean
    expiryDate?: boolean
    isVerified?: boolean
    verificationDate?: boolean
    documentUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driverDocument"]>

  export type DriverDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuedDate?: boolean
    expiryDate?: boolean
    isVerified?: boolean
    verificationDate?: boolean
    documentUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driverDocument"]>

  export type DriverDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuedDate?: boolean
    expiryDate?: boolean
    isVerified?: boolean
    verificationDate?: boolean
    documentUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driverDocument"]>

  export type DriverDocumentSelectScalar = {
    id?: boolean
    driverId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuedDate?: boolean
    expiryDate?: boolean
    isVerified?: boolean
    verificationDate?: boolean
    documentUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DriverDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "driverId" | "documentType" | "documentNumber" | "issuedDate" | "expiryDate" | "isVerified" | "verificationDate" | "documentUrl" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["driverDocument"]>
  export type DriverDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }
  export type DriverDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }
  export type DriverDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | DriverDefaultArgs<ExtArgs>
  }

  export type $DriverDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DriverDocument"
    objects: {
      driver: Prisma.$DriverPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      driverId: string
      documentType: $Enums.DocumentType
      documentNumber: string | null
      issuedDate: Date | null
      expiryDate: Date | null
      isVerified: boolean
      verificationDate: Date | null
      documentUrl: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["driverDocument"]>
    composites: {}
  }

  type DriverDocumentGetPayload<S extends boolean | null | undefined | DriverDocumentDefaultArgs> = $Result.GetResult<Prisma.$DriverDocumentPayload, S>

  type DriverDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriverDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriverDocumentCountAggregateInputType | true
    }

  export interface DriverDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DriverDocument'], meta: { name: 'DriverDocument' } }
    /**
     * Find zero or one DriverDocument that matches the filter.
     * @param {DriverDocumentFindUniqueArgs} args - Arguments to find a DriverDocument
     * @example
     * // Get one DriverDocument
     * const driverDocument = await prisma.driverDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverDocumentFindUniqueArgs>(args: SelectSubset<T, DriverDocumentFindUniqueArgs<ExtArgs>>): Prisma__DriverDocumentClient<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DriverDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriverDocumentFindUniqueOrThrowArgs} args - Arguments to find a DriverDocument
     * @example
     * // Get one DriverDocument
     * const driverDocument = await prisma.driverDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverDocumentClient<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriverDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverDocumentFindFirstArgs} args - Arguments to find a DriverDocument
     * @example
     * // Get one DriverDocument
     * const driverDocument = await prisma.driverDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverDocumentFindFirstArgs>(args?: SelectSubset<T, DriverDocumentFindFirstArgs<ExtArgs>>): Prisma__DriverDocumentClient<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriverDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverDocumentFindFirstOrThrowArgs} args - Arguments to find a DriverDocument
     * @example
     * // Get one DriverDocument
     * const driverDocument = await prisma.driverDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverDocumentClient<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DriverDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DriverDocuments
     * const driverDocuments = await prisma.driverDocument.findMany()
     * 
     * // Get first 10 DriverDocuments
     * const driverDocuments = await prisma.driverDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverDocumentWithIdOnly = await prisma.driverDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverDocumentFindManyArgs>(args?: SelectSubset<T, DriverDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DriverDocument.
     * @param {DriverDocumentCreateArgs} args - Arguments to create a DriverDocument.
     * @example
     * // Create one DriverDocument
     * const DriverDocument = await prisma.driverDocument.create({
     *   data: {
     *     // ... data to create a DriverDocument
     *   }
     * })
     * 
     */
    create<T extends DriverDocumentCreateArgs>(args: SelectSubset<T, DriverDocumentCreateArgs<ExtArgs>>): Prisma__DriverDocumentClient<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DriverDocuments.
     * @param {DriverDocumentCreateManyArgs} args - Arguments to create many DriverDocuments.
     * @example
     * // Create many DriverDocuments
     * const driverDocument = await prisma.driverDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverDocumentCreateManyArgs>(args?: SelectSubset<T, DriverDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DriverDocuments and returns the data saved in the database.
     * @param {DriverDocumentCreateManyAndReturnArgs} args - Arguments to create many DriverDocuments.
     * @example
     * // Create many DriverDocuments
     * const driverDocument = await prisma.driverDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DriverDocuments and only return the `id`
     * const driverDocumentWithIdOnly = await prisma.driverDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DriverDocument.
     * @param {DriverDocumentDeleteArgs} args - Arguments to delete one DriverDocument.
     * @example
     * // Delete one DriverDocument
     * const DriverDocument = await prisma.driverDocument.delete({
     *   where: {
     *     // ... filter to delete one DriverDocument
     *   }
     * })
     * 
     */
    delete<T extends DriverDocumentDeleteArgs>(args: SelectSubset<T, DriverDocumentDeleteArgs<ExtArgs>>): Prisma__DriverDocumentClient<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DriverDocument.
     * @param {DriverDocumentUpdateArgs} args - Arguments to update one DriverDocument.
     * @example
     * // Update one DriverDocument
     * const driverDocument = await prisma.driverDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverDocumentUpdateArgs>(args: SelectSubset<T, DriverDocumentUpdateArgs<ExtArgs>>): Prisma__DriverDocumentClient<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DriverDocuments.
     * @param {DriverDocumentDeleteManyArgs} args - Arguments to filter DriverDocuments to delete.
     * @example
     * // Delete a few DriverDocuments
     * const { count } = await prisma.driverDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverDocumentDeleteManyArgs>(args?: SelectSubset<T, DriverDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriverDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DriverDocuments
     * const driverDocument = await prisma.driverDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverDocumentUpdateManyArgs>(args: SelectSubset<T, DriverDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriverDocuments and returns the data updated in the database.
     * @param {DriverDocumentUpdateManyAndReturnArgs} args - Arguments to update many DriverDocuments.
     * @example
     * // Update many DriverDocuments
     * const driverDocument = await prisma.driverDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DriverDocuments and only return the `id`
     * const driverDocumentWithIdOnly = await prisma.driverDocument.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DriverDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DriverDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DriverDocument.
     * @param {DriverDocumentUpsertArgs} args - Arguments to update or create a DriverDocument.
     * @example
     * // Update or create a DriverDocument
     * const driverDocument = await prisma.driverDocument.upsert({
     *   create: {
     *     // ... data to create a DriverDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DriverDocument we want to update
     *   }
     * })
     */
    upsert<T extends DriverDocumentUpsertArgs>(args: SelectSubset<T, DriverDocumentUpsertArgs<ExtArgs>>): Prisma__DriverDocumentClient<$Result.GetResult<Prisma.$DriverDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DriverDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverDocumentCountArgs} args - Arguments to filter DriverDocuments to count.
     * @example
     * // Count the number of DriverDocuments
     * const count = await prisma.driverDocument.count({
     *   where: {
     *     // ... the filter for the DriverDocuments we want to count
     *   }
     * })
    **/
    count<T extends DriverDocumentCountArgs>(
      args?: Subset<T, DriverDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DriverDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriverDocumentAggregateArgs>(args: Subset<T, DriverDocumentAggregateArgs>): Prisma.PrismaPromise<GetDriverDocumentAggregateType<T>>

    /**
     * Group by DriverDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriverDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverDocumentGroupByArgs['orderBy'] }
        : { orderBy?: DriverDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriverDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DriverDocument model
   */
  readonly fields: DriverDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DriverDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends DriverDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DriverDefaultArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DriverDocument model
   */
  interface DriverDocumentFieldRefs {
    readonly id: FieldRef<"DriverDocument", 'String'>
    readonly driverId: FieldRef<"DriverDocument", 'String'>
    readonly documentType: FieldRef<"DriverDocument", 'DocumentType'>
    readonly documentNumber: FieldRef<"DriverDocument", 'String'>
    readonly issuedDate: FieldRef<"DriverDocument", 'DateTime'>
    readonly expiryDate: FieldRef<"DriverDocument", 'DateTime'>
    readonly isVerified: FieldRef<"DriverDocument", 'Boolean'>
    readonly verificationDate: FieldRef<"DriverDocument", 'DateTime'>
    readonly documentUrl: FieldRef<"DriverDocument", 'String'>
    readonly notes: FieldRef<"DriverDocument", 'String'>
    readonly createdAt: FieldRef<"DriverDocument", 'DateTime'>
    readonly updatedAt: FieldRef<"DriverDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DriverDocument findUnique
   */
  export type DriverDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    /**
     * Filter, which DriverDocument to fetch.
     */
    where: DriverDocumentWhereUniqueInput
  }

  /**
   * DriverDocument findUniqueOrThrow
   */
  export type DriverDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    /**
     * Filter, which DriverDocument to fetch.
     */
    where: DriverDocumentWhereUniqueInput
  }

  /**
   * DriverDocument findFirst
   */
  export type DriverDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    /**
     * Filter, which DriverDocument to fetch.
     */
    where?: DriverDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverDocuments to fetch.
     */
    orderBy?: DriverDocumentOrderByWithRelationInput | DriverDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriverDocuments.
     */
    cursor?: DriverDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriverDocuments.
     */
    distinct?: DriverDocumentScalarFieldEnum | DriverDocumentScalarFieldEnum[]
  }

  /**
   * DriverDocument findFirstOrThrow
   */
  export type DriverDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    /**
     * Filter, which DriverDocument to fetch.
     */
    where?: DriverDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverDocuments to fetch.
     */
    orderBy?: DriverDocumentOrderByWithRelationInput | DriverDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriverDocuments.
     */
    cursor?: DriverDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriverDocuments.
     */
    distinct?: DriverDocumentScalarFieldEnum | DriverDocumentScalarFieldEnum[]
  }

  /**
   * DriverDocument findMany
   */
  export type DriverDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    /**
     * Filter, which DriverDocuments to fetch.
     */
    where?: DriverDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverDocuments to fetch.
     */
    orderBy?: DriverDocumentOrderByWithRelationInput | DriverDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DriverDocuments.
     */
    cursor?: DriverDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverDocuments.
     */
    skip?: number
    distinct?: DriverDocumentScalarFieldEnum | DriverDocumentScalarFieldEnum[]
  }

  /**
   * DriverDocument create
   */
  export type DriverDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a DriverDocument.
     */
    data: XOR<DriverDocumentCreateInput, DriverDocumentUncheckedCreateInput>
  }

  /**
   * DriverDocument createMany
   */
  export type DriverDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DriverDocuments.
     */
    data: DriverDocumentCreateManyInput | DriverDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DriverDocument createManyAndReturn
   */
  export type DriverDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many DriverDocuments.
     */
    data: DriverDocumentCreateManyInput | DriverDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DriverDocument update
   */
  export type DriverDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a DriverDocument.
     */
    data: XOR<DriverDocumentUpdateInput, DriverDocumentUncheckedUpdateInput>
    /**
     * Choose, which DriverDocument to update.
     */
    where: DriverDocumentWhereUniqueInput
  }

  /**
   * DriverDocument updateMany
   */
  export type DriverDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DriverDocuments.
     */
    data: XOR<DriverDocumentUpdateManyMutationInput, DriverDocumentUncheckedUpdateManyInput>
    /**
     * Filter which DriverDocuments to update
     */
    where?: DriverDocumentWhereInput
    /**
     * Limit how many DriverDocuments to update.
     */
    limit?: number
  }

  /**
   * DriverDocument updateManyAndReturn
   */
  export type DriverDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * The data used to update DriverDocuments.
     */
    data: XOR<DriverDocumentUpdateManyMutationInput, DriverDocumentUncheckedUpdateManyInput>
    /**
     * Filter which DriverDocuments to update
     */
    where?: DriverDocumentWhereInput
    /**
     * Limit how many DriverDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DriverDocument upsert
   */
  export type DriverDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the DriverDocument to update in case it exists.
     */
    where: DriverDocumentWhereUniqueInput
    /**
     * In case the DriverDocument found by the `where` argument doesn't exist, create a new DriverDocument with this data.
     */
    create: XOR<DriverDocumentCreateInput, DriverDocumentUncheckedCreateInput>
    /**
     * In case the DriverDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverDocumentUpdateInput, DriverDocumentUncheckedUpdateInput>
  }

  /**
   * DriverDocument delete
   */
  export type DriverDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
    /**
     * Filter which DriverDocument to delete.
     */
    where: DriverDocumentWhereUniqueInput
  }

  /**
   * DriverDocument deleteMany
   */
  export type DriverDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriverDocuments to delete
     */
    where?: DriverDocumentWhereInput
    /**
     * Limit how many DriverDocuments to delete.
     */
    limit?: number
  }

  /**
   * DriverDocument without action
   */
  export type DriverDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverDocument
     */
    select?: DriverDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverDocument
     */
    omit?: DriverDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverDocumentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    phone: 'phone',
    firstName: 'firstName',
    lastName: 'lastName',
    gender: 'gender',
    dateOfBirth: 'dateOfBirth',
    profileImage: 'profileImage',
    address: 'address',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    clerkId: 'clerkId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DriverScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    licenseNumber: 'licenseNumber',
    licenseExpiryDate: 'licenseExpiryDate',
    isAvailable: 'isAvailable',
    currentLatitude: 'currentLatitude',
    currentLongitude: 'currentLongitude',
    averageRating: 'averageRating',
    totalRides: 'totalRides',
    accountStatus: 'accountStatus',
    backgroundCheckStatus: 'backgroundCheckStatus',
    backgroundCheckDate: 'backgroundCheckDate',
    isOnline: 'isOnline',
    acceptsFemaleOnly: 'acceptsFemaleOnly',
    bankAccount: 'bankAccount'
  };

  export type DriverScalarFieldEnum = (typeof DriverScalarFieldEnum)[keyof typeof DriverScalarFieldEnum]


  export const PassengerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    prefersFemaleDriver: 'prefersFemaleDriver',
    totalRides: 'totalRides',
    averageRating: 'averageRating',
    specialNeeds: 'specialNeeds',
    specialNeedsDesc: 'specialNeedsDesc',
    homeAddress: 'homeAddress',
    homeLatitude: 'homeLatitude',
    homeLongitude: 'homeLongitude',
    workAddress: 'workAddress',
    workLatitude: 'workLatitude',
    workLongitude: 'workLongitude'
  };

  export type PassengerScalarFieldEnum = (typeof PassengerScalarFieldEnum)[keyof typeof PassengerScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    driverId: 'driverId',
    make: 'make',
    model: 'model',
    year: 'year',
    color: 'color',
    licensePlate: 'licensePlate',
    registrationExpiryDate: 'registrationExpiryDate',
    insuranceExpiryDate: 'insuranceExpiryDate',
    vehicleType: 'vehicleType',
    capacity: 'capacity',
    accessibility: 'accessibility',
    carImageUrl: 'carImageUrl',
    features: 'features',
    inspectionStatus: 'inspectionStatus',
    inspectionDate: 'inspectionDate'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const RideScalarFieldEnum: {
    id: 'id',
    passengerId: 'passengerId',
    driverId: 'driverId',
    vehicleId: 'vehicleId',
    status: 'status',
    requestTime: 'requestTime',
    acceptTime: 'acceptTime',
    pickupTime: 'pickupTime',
    dropOffTime: 'dropOffTime',
    originAddress: 'originAddress',
    originLatitude: 'originLatitude',
    originLongitude: 'originLongitude',
    destinationAddress: 'destinationAddress',
    destinationLatitude: 'destinationLatitude',
    destinationLongitude: 'destinationLongitude',
    estimatedDuration: 'estimatedDuration',
    actualDuration: 'actualDuration',
    estimatedDistance: 'estimatedDistance',
    actualDistance: 'actualDistance',
    basePrice: 'basePrice',
    finalPrice: 'finalPrice',
    currency: 'currency',
    paymentStatus: 'paymentStatus',
    paymentMethodId: 'paymentMethodId',
    cancellationReason: 'cancellationReason',
    cancellationTime: 'cancellationTime',
    cancellationFee: 'cancellationFee',
    isFemaleOnlyRide: 'isFemaleOnlyRide',
    specialRequirements: 'specialRequirements',
    baggageQuantity: 'baggageQuantity',
    rideType: 'rideType',
    scheduledTime: 'scheduledTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RideScalarFieldEnum = (typeof RideScalarFieldEnum)[keyof typeof RideScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    rideId: 'rideId',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    paymentMethod: 'paymentMethod',
    paymentIntentId: 'paymentIntentId',
    stripeCustomerId: 'stripeCustomerId',
    receiptUrl: 'receiptUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const RatingScalarFieldEnum: {
    id: 'id',
    rideId: 'rideId',
    ratedByUserId: 'ratedByUserId',
    ratedUserId: 'ratedUserId',
    rating: 'rating',
    review: 'review',
    cleanliness: 'cleanliness',
    drivingSkill: 'drivingSkill',
    courtesy: 'courtesy',
    createdAt: 'createdAt'
  };

  export type RatingScalarFieldEnum = (typeof RatingScalarFieldEnum)[keyof typeof RatingScalarFieldEnum]


  export const RideLocationScalarFieldEnum: {
    id: 'id',
    rideId: 'rideId',
    latitude: 'latitude',
    longitude: 'longitude',
    timestamp: 'timestamp',
    speed: 'speed',
    bearing: 'bearing',
    accuracy: 'accuracy',
    userType: 'userType'
  };

  export type RideLocationScalarFieldEnum = (typeof RideLocationScalarFieldEnum)[keyof typeof RideLocationScalarFieldEnum]


  export const DriverDocumentScalarFieldEnum: {
    id: 'id',
    driverId: 'driverId',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    issuedDate: 'issuedDate',
    expiryDate: 'expiryDate',
    isVerified: 'isVerified',
    verificationDate: 'verificationDate',
    documentUrl: 'documentUrl',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DriverDocumentScalarFieldEnum = (typeof DriverDocumentScalarFieldEnum)[keyof typeof DriverDocumentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'VehicleType'
   */
  export type EnumVehicleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleType'>
    


  /**
   * Reference to a field of type 'VehicleType[]'
   */
  export type ListEnumVehicleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleType[]'>
    


  /**
   * Reference to a field of type 'RideStatus'
   */
  export type EnumRideStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RideStatus'>
    


  /**
   * Reference to a field of type 'RideStatus[]'
   */
  export type ListEnumRideStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RideStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'RideType'
   */
  export type EnumRideTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RideType'>
    


  /**
   * Reference to a field of type 'RideType[]'
   */
  export type ListEnumRideTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RideType[]'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'UserType[]'
   */
  export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType[]'>
    


  /**
   * Reference to a field of type 'DocumentType'
   */
  export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>
    


  /**
   * Reference to a field of type 'DocumentType[]'
   */
  export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    clerkId?: StringFilter<"User"> | string
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    passenger?: XOR<PassengerNullableScalarRelationFilter, PassengerWhereInput> | null
    ratings?: RatingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    clerkId?: SortOrder
    driver?: DriverOrderByWithRelationInput
    passenger?: PassengerOrderByWithRelationInput
    ratings?: RatingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    clerkId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    passenger?: XOR<PassengerNullableScalarRelationFilter, PassengerWhereInput> | null
    ratings?: RatingListRelationFilter
  }, "id" | "email" | "phone" | "clerkId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    clerkId?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    gender?: EnumGenderWithAggregatesFilter<"User"> | $Enums.Gender
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    clerkId?: StringWithAggregatesFilter<"User"> | string
  }

  export type DriverWhereInput = {
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    id?: StringFilter<"Driver"> | string
    userId?: StringFilter<"Driver"> | string
    licenseNumber?: StringFilter<"Driver"> | string
    licenseExpiryDate?: DateTimeFilter<"Driver"> | Date | string
    isAvailable?: BoolFilter<"Driver"> | boolean
    currentLatitude?: FloatNullableFilter<"Driver"> | number | null
    currentLongitude?: FloatNullableFilter<"Driver"> | number | null
    averageRating?: FloatFilter<"Driver"> | number
    totalRides?: IntFilter<"Driver"> | number
    accountStatus?: EnumStatusFilter<"Driver"> | $Enums.Status
    backgroundCheckStatus?: EnumStatusFilter<"Driver"> | $Enums.Status
    backgroundCheckDate?: DateTimeNullableFilter<"Driver"> | Date | string | null
    isOnline?: BoolFilter<"Driver"> | boolean
    acceptsFemaleOnly?: BoolFilter<"Driver"> | boolean
    bankAccount?: StringNullableFilter<"Driver"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    rides?: RideListRelationFilter
    documents?: DriverDocumentListRelationFilter
  }

  export type DriverOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiryDate?: SortOrder
    isAvailable?: SortOrder
    currentLatitude?: SortOrderInput | SortOrder
    currentLongitude?: SortOrderInput | SortOrder
    averageRating?: SortOrder
    totalRides?: SortOrder
    accountStatus?: SortOrder
    backgroundCheckStatus?: SortOrder
    backgroundCheckDate?: SortOrderInput | SortOrder
    isOnline?: SortOrder
    acceptsFemaleOnly?: SortOrder
    bankAccount?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
    rides?: RideOrderByRelationAggregateInput
    documents?: DriverDocumentOrderByRelationAggregateInput
  }

  export type DriverWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    licenseNumber?: string
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    licenseExpiryDate?: DateTimeFilter<"Driver"> | Date | string
    isAvailable?: BoolFilter<"Driver"> | boolean
    currentLatitude?: FloatNullableFilter<"Driver"> | number | null
    currentLongitude?: FloatNullableFilter<"Driver"> | number | null
    averageRating?: FloatFilter<"Driver"> | number
    totalRides?: IntFilter<"Driver"> | number
    accountStatus?: EnumStatusFilter<"Driver"> | $Enums.Status
    backgroundCheckStatus?: EnumStatusFilter<"Driver"> | $Enums.Status
    backgroundCheckDate?: DateTimeNullableFilter<"Driver"> | Date | string | null
    isOnline?: BoolFilter<"Driver"> | boolean
    acceptsFemaleOnly?: BoolFilter<"Driver"> | boolean
    bankAccount?: StringNullableFilter<"Driver"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    rides?: RideListRelationFilter
    documents?: DriverDocumentListRelationFilter
  }, "id" | "userId" | "licenseNumber">

  export type DriverOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiryDate?: SortOrder
    isAvailable?: SortOrder
    currentLatitude?: SortOrderInput | SortOrder
    currentLongitude?: SortOrderInput | SortOrder
    averageRating?: SortOrder
    totalRides?: SortOrder
    accountStatus?: SortOrder
    backgroundCheckStatus?: SortOrder
    backgroundCheckDate?: SortOrderInput | SortOrder
    isOnline?: SortOrder
    acceptsFemaleOnly?: SortOrder
    bankAccount?: SortOrderInput | SortOrder
    _count?: DriverCountOrderByAggregateInput
    _avg?: DriverAvgOrderByAggregateInput
    _max?: DriverMaxOrderByAggregateInput
    _min?: DriverMinOrderByAggregateInput
    _sum?: DriverSumOrderByAggregateInput
  }

  export type DriverScalarWhereWithAggregatesInput = {
    AND?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    OR?: DriverScalarWhereWithAggregatesInput[]
    NOT?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Driver"> | string
    userId?: StringWithAggregatesFilter<"Driver"> | string
    licenseNumber?: StringWithAggregatesFilter<"Driver"> | string
    licenseExpiryDate?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
    isAvailable?: BoolWithAggregatesFilter<"Driver"> | boolean
    currentLatitude?: FloatNullableWithAggregatesFilter<"Driver"> | number | null
    currentLongitude?: FloatNullableWithAggregatesFilter<"Driver"> | number | null
    averageRating?: FloatWithAggregatesFilter<"Driver"> | number
    totalRides?: IntWithAggregatesFilter<"Driver"> | number
    accountStatus?: EnumStatusWithAggregatesFilter<"Driver"> | $Enums.Status
    backgroundCheckStatus?: EnumStatusWithAggregatesFilter<"Driver"> | $Enums.Status
    backgroundCheckDate?: DateTimeNullableWithAggregatesFilter<"Driver"> | Date | string | null
    isOnline?: BoolWithAggregatesFilter<"Driver"> | boolean
    acceptsFemaleOnly?: BoolWithAggregatesFilter<"Driver"> | boolean
    bankAccount?: StringNullableWithAggregatesFilter<"Driver"> | string | null
  }

  export type PassengerWhereInput = {
    AND?: PassengerWhereInput | PassengerWhereInput[]
    OR?: PassengerWhereInput[]
    NOT?: PassengerWhereInput | PassengerWhereInput[]
    id?: StringFilter<"Passenger"> | string
    userId?: StringFilter<"Passenger"> | string
    prefersFemaleDriver?: BoolFilter<"Passenger"> | boolean
    totalRides?: IntFilter<"Passenger"> | number
    averageRating?: FloatFilter<"Passenger"> | number
    specialNeeds?: BoolFilter<"Passenger"> | boolean
    specialNeedsDesc?: StringNullableFilter<"Passenger"> | string | null
    homeAddress?: StringNullableFilter<"Passenger"> | string | null
    homeLatitude?: FloatNullableFilter<"Passenger"> | number | null
    homeLongitude?: FloatNullableFilter<"Passenger"> | number | null
    workAddress?: StringNullableFilter<"Passenger"> | string | null
    workLatitude?: FloatNullableFilter<"Passenger"> | number | null
    workLongitude?: FloatNullableFilter<"Passenger"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    rides?: RideListRelationFilter
  }

  export type PassengerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    prefersFemaleDriver?: SortOrder
    totalRides?: SortOrder
    averageRating?: SortOrder
    specialNeeds?: SortOrder
    specialNeedsDesc?: SortOrderInput | SortOrder
    homeAddress?: SortOrderInput | SortOrder
    homeLatitude?: SortOrderInput | SortOrder
    homeLongitude?: SortOrderInput | SortOrder
    workAddress?: SortOrderInput | SortOrder
    workLatitude?: SortOrderInput | SortOrder
    workLongitude?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    rides?: RideOrderByRelationAggregateInput
  }

  export type PassengerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: PassengerWhereInput | PassengerWhereInput[]
    OR?: PassengerWhereInput[]
    NOT?: PassengerWhereInput | PassengerWhereInput[]
    prefersFemaleDriver?: BoolFilter<"Passenger"> | boolean
    totalRides?: IntFilter<"Passenger"> | number
    averageRating?: FloatFilter<"Passenger"> | number
    specialNeeds?: BoolFilter<"Passenger"> | boolean
    specialNeedsDesc?: StringNullableFilter<"Passenger"> | string | null
    homeAddress?: StringNullableFilter<"Passenger"> | string | null
    homeLatitude?: FloatNullableFilter<"Passenger"> | number | null
    homeLongitude?: FloatNullableFilter<"Passenger"> | number | null
    workAddress?: StringNullableFilter<"Passenger"> | string | null
    workLatitude?: FloatNullableFilter<"Passenger"> | number | null
    workLongitude?: FloatNullableFilter<"Passenger"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    rides?: RideListRelationFilter
  }, "id" | "userId">

  export type PassengerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    prefersFemaleDriver?: SortOrder
    totalRides?: SortOrder
    averageRating?: SortOrder
    specialNeeds?: SortOrder
    specialNeedsDesc?: SortOrderInput | SortOrder
    homeAddress?: SortOrderInput | SortOrder
    homeLatitude?: SortOrderInput | SortOrder
    homeLongitude?: SortOrderInput | SortOrder
    workAddress?: SortOrderInput | SortOrder
    workLatitude?: SortOrderInput | SortOrder
    workLongitude?: SortOrderInput | SortOrder
    _count?: PassengerCountOrderByAggregateInput
    _avg?: PassengerAvgOrderByAggregateInput
    _max?: PassengerMaxOrderByAggregateInput
    _min?: PassengerMinOrderByAggregateInput
    _sum?: PassengerSumOrderByAggregateInput
  }

  export type PassengerScalarWhereWithAggregatesInput = {
    AND?: PassengerScalarWhereWithAggregatesInput | PassengerScalarWhereWithAggregatesInput[]
    OR?: PassengerScalarWhereWithAggregatesInput[]
    NOT?: PassengerScalarWhereWithAggregatesInput | PassengerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Passenger"> | string
    userId?: StringWithAggregatesFilter<"Passenger"> | string
    prefersFemaleDriver?: BoolWithAggregatesFilter<"Passenger"> | boolean
    totalRides?: IntWithAggregatesFilter<"Passenger"> | number
    averageRating?: FloatWithAggregatesFilter<"Passenger"> | number
    specialNeeds?: BoolWithAggregatesFilter<"Passenger"> | boolean
    specialNeedsDesc?: StringNullableWithAggregatesFilter<"Passenger"> | string | null
    homeAddress?: StringNullableWithAggregatesFilter<"Passenger"> | string | null
    homeLatitude?: FloatNullableWithAggregatesFilter<"Passenger"> | number | null
    homeLongitude?: FloatNullableWithAggregatesFilter<"Passenger"> | number | null
    workAddress?: StringNullableWithAggregatesFilter<"Passenger"> | string | null
    workLatitude?: FloatNullableWithAggregatesFilter<"Passenger"> | number | null
    workLongitude?: FloatNullableWithAggregatesFilter<"Passenger"> | number | null
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    driverId?: StringFilter<"Vehicle"> | string
    make?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    color?: StringFilter<"Vehicle"> | string
    licensePlate?: StringFilter<"Vehicle"> | string
    registrationExpiryDate?: DateTimeFilter<"Vehicle"> | Date | string
    insuranceExpiryDate?: DateTimeFilter<"Vehicle"> | Date | string
    vehicleType?: EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType
    capacity?: IntFilter<"Vehicle"> | number
    accessibility?: BoolFilter<"Vehicle"> | boolean
    carImageUrl?: StringNullableFilter<"Vehicle"> | string | null
    features?: StringNullableListFilter<"Vehicle">
    inspectionStatus?: EnumStatusFilter<"Vehicle"> | $Enums.Status
    inspectionDate?: DateTimeNullableFilter<"Vehicle"> | Date | string | null
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
    rides?: RideListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    driverId?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    licensePlate?: SortOrder
    registrationExpiryDate?: SortOrder
    insuranceExpiryDate?: SortOrder
    vehicleType?: SortOrder
    capacity?: SortOrder
    accessibility?: SortOrder
    carImageUrl?: SortOrderInput | SortOrder
    features?: SortOrder
    inspectionStatus?: SortOrder
    inspectionDate?: SortOrderInput | SortOrder
    driver?: DriverOrderByWithRelationInput
    rides?: RideOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    driverId?: string
    licensePlate?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    make?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    color?: StringFilter<"Vehicle"> | string
    registrationExpiryDate?: DateTimeFilter<"Vehicle"> | Date | string
    insuranceExpiryDate?: DateTimeFilter<"Vehicle"> | Date | string
    vehicleType?: EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType
    capacity?: IntFilter<"Vehicle"> | number
    accessibility?: BoolFilter<"Vehicle"> | boolean
    carImageUrl?: StringNullableFilter<"Vehicle"> | string | null
    features?: StringNullableListFilter<"Vehicle">
    inspectionStatus?: EnumStatusFilter<"Vehicle"> | $Enums.Status
    inspectionDate?: DateTimeNullableFilter<"Vehicle"> | Date | string | null
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
    rides?: RideListRelationFilter
  }, "id" | "driverId" | "licensePlate">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    driverId?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    licensePlate?: SortOrder
    registrationExpiryDate?: SortOrder
    insuranceExpiryDate?: SortOrder
    vehicleType?: SortOrder
    capacity?: SortOrder
    accessibility?: SortOrder
    carImageUrl?: SortOrderInput | SortOrder
    features?: SortOrder
    inspectionStatus?: SortOrder
    inspectionDate?: SortOrderInput | SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    driverId?: StringWithAggregatesFilter<"Vehicle"> | string
    make?: StringWithAggregatesFilter<"Vehicle"> | string
    model?: StringWithAggregatesFilter<"Vehicle"> | string
    year?: IntWithAggregatesFilter<"Vehicle"> | number
    color?: StringWithAggregatesFilter<"Vehicle"> | string
    licensePlate?: StringWithAggregatesFilter<"Vehicle"> | string
    registrationExpiryDate?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    insuranceExpiryDate?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    vehicleType?: EnumVehicleTypeWithAggregatesFilter<"Vehicle"> | $Enums.VehicleType
    capacity?: IntWithAggregatesFilter<"Vehicle"> | number
    accessibility?: BoolWithAggregatesFilter<"Vehicle"> | boolean
    carImageUrl?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    features?: StringNullableListFilter<"Vehicle">
    inspectionStatus?: EnumStatusWithAggregatesFilter<"Vehicle"> | $Enums.Status
    inspectionDate?: DateTimeNullableWithAggregatesFilter<"Vehicle"> | Date | string | null
  }

  export type RideWhereInput = {
    AND?: RideWhereInput | RideWhereInput[]
    OR?: RideWhereInput[]
    NOT?: RideWhereInput | RideWhereInput[]
    id?: StringFilter<"Ride"> | string
    passengerId?: StringFilter<"Ride"> | string
    driverId?: StringNullableFilter<"Ride"> | string | null
    vehicleId?: StringNullableFilter<"Ride"> | string | null
    status?: EnumRideStatusFilter<"Ride"> | $Enums.RideStatus
    requestTime?: DateTimeFilter<"Ride"> | Date | string
    acceptTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    pickupTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    dropOffTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    originAddress?: StringFilter<"Ride"> | string
    originLatitude?: FloatFilter<"Ride"> | number
    originLongitude?: FloatFilter<"Ride"> | number
    destinationAddress?: StringFilter<"Ride"> | string
    destinationLatitude?: FloatFilter<"Ride"> | number
    destinationLongitude?: FloatFilter<"Ride"> | number
    estimatedDuration?: IntFilter<"Ride"> | number
    actualDuration?: IntNullableFilter<"Ride"> | number | null
    estimatedDistance?: FloatFilter<"Ride"> | number
    actualDistance?: FloatNullableFilter<"Ride"> | number | null
    basePrice?: FloatFilter<"Ride"> | number
    finalPrice?: FloatNullableFilter<"Ride"> | number | null
    currency?: StringFilter<"Ride"> | string
    paymentStatus?: EnumPaymentStatusFilter<"Ride"> | $Enums.PaymentStatus
    paymentMethodId?: StringNullableFilter<"Ride"> | string | null
    cancellationReason?: StringNullableFilter<"Ride"> | string | null
    cancellationTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    cancellationFee?: FloatNullableFilter<"Ride"> | number | null
    isFemaleOnlyRide?: BoolFilter<"Ride"> | boolean
    specialRequirements?: StringNullableFilter<"Ride"> | string | null
    baggageQuantity?: IntFilter<"Ride"> | number
    rideType?: EnumRideTypeFilter<"Ride"> | $Enums.RideType
    scheduledTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    createdAt?: DateTimeFilter<"Ride"> | Date | string
    updatedAt?: DateTimeFilter<"Ride"> | Date | string
    passenger?: XOR<PassengerScalarRelationFilter, PassengerWhereInput>
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    ratings?: RatingListRelationFilter
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
    locations?: RideLocationListRelationFilter
  }

  export type RideOrderByWithRelationInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrderInput | SortOrder
    vehicleId?: SortOrderInput | SortOrder
    status?: SortOrder
    requestTime?: SortOrder
    acceptTime?: SortOrderInput | SortOrder
    pickupTime?: SortOrderInput | SortOrder
    dropOffTime?: SortOrderInput | SortOrder
    originAddress?: SortOrder
    originLatitude?: SortOrder
    originLongitude?: SortOrder
    destinationAddress?: SortOrder
    destinationLatitude?: SortOrder
    destinationLongitude?: SortOrder
    estimatedDuration?: SortOrder
    actualDuration?: SortOrderInput | SortOrder
    estimatedDistance?: SortOrder
    actualDistance?: SortOrderInput | SortOrder
    basePrice?: SortOrder
    finalPrice?: SortOrderInput | SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paymentMethodId?: SortOrderInput | SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    cancellationTime?: SortOrderInput | SortOrder
    cancellationFee?: SortOrderInput | SortOrder
    isFemaleOnlyRide?: SortOrder
    specialRequirements?: SortOrderInput | SortOrder
    baggageQuantity?: SortOrder
    rideType?: SortOrder
    scheduledTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    passenger?: PassengerOrderByWithRelationInput
    driver?: DriverOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
    ratings?: RatingOrderByRelationAggregateInput
    payment?: PaymentOrderByWithRelationInput
    locations?: RideLocationOrderByRelationAggregateInput
  }

  export type RideWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RideWhereInput | RideWhereInput[]
    OR?: RideWhereInput[]
    NOT?: RideWhereInput | RideWhereInput[]
    passengerId?: StringFilter<"Ride"> | string
    driverId?: StringNullableFilter<"Ride"> | string | null
    vehicleId?: StringNullableFilter<"Ride"> | string | null
    status?: EnumRideStatusFilter<"Ride"> | $Enums.RideStatus
    requestTime?: DateTimeFilter<"Ride"> | Date | string
    acceptTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    pickupTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    dropOffTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    originAddress?: StringFilter<"Ride"> | string
    originLatitude?: FloatFilter<"Ride"> | number
    originLongitude?: FloatFilter<"Ride"> | number
    destinationAddress?: StringFilter<"Ride"> | string
    destinationLatitude?: FloatFilter<"Ride"> | number
    destinationLongitude?: FloatFilter<"Ride"> | number
    estimatedDuration?: IntFilter<"Ride"> | number
    actualDuration?: IntNullableFilter<"Ride"> | number | null
    estimatedDistance?: FloatFilter<"Ride"> | number
    actualDistance?: FloatNullableFilter<"Ride"> | number | null
    basePrice?: FloatFilter<"Ride"> | number
    finalPrice?: FloatNullableFilter<"Ride"> | number | null
    currency?: StringFilter<"Ride"> | string
    paymentStatus?: EnumPaymentStatusFilter<"Ride"> | $Enums.PaymentStatus
    paymentMethodId?: StringNullableFilter<"Ride"> | string | null
    cancellationReason?: StringNullableFilter<"Ride"> | string | null
    cancellationTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    cancellationFee?: FloatNullableFilter<"Ride"> | number | null
    isFemaleOnlyRide?: BoolFilter<"Ride"> | boolean
    specialRequirements?: StringNullableFilter<"Ride"> | string | null
    baggageQuantity?: IntFilter<"Ride"> | number
    rideType?: EnumRideTypeFilter<"Ride"> | $Enums.RideType
    scheduledTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    createdAt?: DateTimeFilter<"Ride"> | Date | string
    updatedAt?: DateTimeFilter<"Ride"> | Date | string
    passenger?: XOR<PassengerScalarRelationFilter, PassengerWhereInput>
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    ratings?: RatingListRelationFilter
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
    locations?: RideLocationListRelationFilter
  }, "id">

  export type RideOrderByWithAggregationInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrderInput | SortOrder
    vehicleId?: SortOrderInput | SortOrder
    status?: SortOrder
    requestTime?: SortOrder
    acceptTime?: SortOrderInput | SortOrder
    pickupTime?: SortOrderInput | SortOrder
    dropOffTime?: SortOrderInput | SortOrder
    originAddress?: SortOrder
    originLatitude?: SortOrder
    originLongitude?: SortOrder
    destinationAddress?: SortOrder
    destinationLatitude?: SortOrder
    destinationLongitude?: SortOrder
    estimatedDuration?: SortOrder
    actualDuration?: SortOrderInput | SortOrder
    estimatedDistance?: SortOrder
    actualDistance?: SortOrderInput | SortOrder
    basePrice?: SortOrder
    finalPrice?: SortOrderInput | SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paymentMethodId?: SortOrderInput | SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    cancellationTime?: SortOrderInput | SortOrder
    cancellationFee?: SortOrderInput | SortOrder
    isFemaleOnlyRide?: SortOrder
    specialRequirements?: SortOrderInput | SortOrder
    baggageQuantity?: SortOrder
    rideType?: SortOrder
    scheduledTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RideCountOrderByAggregateInput
    _avg?: RideAvgOrderByAggregateInput
    _max?: RideMaxOrderByAggregateInput
    _min?: RideMinOrderByAggregateInput
    _sum?: RideSumOrderByAggregateInput
  }

  export type RideScalarWhereWithAggregatesInput = {
    AND?: RideScalarWhereWithAggregatesInput | RideScalarWhereWithAggregatesInput[]
    OR?: RideScalarWhereWithAggregatesInput[]
    NOT?: RideScalarWhereWithAggregatesInput | RideScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ride"> | string
    passengerId?: StringWithAggregatesFilter<"Ride"> | string
    driverId?: StringNullableWithAggregatesFilter<"Ride"> | string | null
    vehicleId?: StringNullableWithAggregatesFilter<"Ride"> | string | null
    status?: EnumRideStatusWithAggregatesFilter<"Ride"> | $Enums.RideStatus
    requestTime?: DateTimeWithAggregatesFilter<"Ride"> | Date | string
    acceptTime?: DateTimeNullableWithAggregatesFilter<"Ride"> | Date | string | null
    pickupTime?: DateTimeNullableWithAggregatesFilter<"Ride"> | Date | string | null
    dropOffTime?: DateTimeNullableWithAggregatesFilter<"Ride"> | Date | string | null
    originAddress?: StringWithAggregatesFilter<"Ride"> | string
    originLatitude?: FloatWithAggregatesFilter<"Ride"> | number
    originLongitude?: FloatWithAggregatesFilter<"Ride"> | number
    destinationAddress?: StringWithAggregatesFilter<"Ride"> | string
    destinationLatitude?: FloatWithAggregatesFilter<"Ride"> | number
    destinationLongitude?: FloatWithAggregatesFilter<"Ride"> | number
    estimatedDuration?: IntWithAggregatesFilter<"Ride"> | number
    actualDuration?: IntNullableWithAggregatesFilter<"Ride"> | number | null
    estimatedDistance?: FloatWithAggregatesFilter<"Ride"> | number
    actualDistance?: FloatNullableWithAggregatesFilter<"Ride"> | number | null
    basePrice?: FloatWithAggregatesFilter<"Ride"> | number
    finalPrice?: FloatNullableWithAggregatesFilter<"Ride"> | number | null
    currency?: StringWithAggregatesFilter<"Ride"> | string
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Ride"> | $Enums.PaymentStatus
    paymentMethodId?: StringNullableWithAggregatesFilter<"Ride"> | string | null
    cancellationReason?: StringNullableWithAggregatesFilter<"Ride"> | string | null
    cancellationTime?: DateTimeNullableWithAggregatesFilter<"Ride"> | Date | string | null
    cancellationFee?: FloatNullableWithAggregatesFilter<"Ride"> | number | null
    isFemaleOnlyRide?: BoolWithAggregatesFilter<"Ride"> | boolean
    specialRequirements?: StringNullableWithAggregatesFilter<"Ride"> | string | null
    baggageQuantity?: IntWithAggregatesFilter<"Ride"> | number
    rideType?: EnumRideTypeWithAggregatesFilter<"Ride"> | $Enums.RideType
    scheduledTime?: DateTimeNullableWithAggregatesFilter<"Ride"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Ride"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ride"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    rideId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: StringFilter<"Payment"> | string
    paymentIntentId?: StringNullableFilter<"Payment"> | string | null
    stripeCustomerId?: StringNullableFilter<"Payment"> | string | null
    receiptUrl?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    ride?: XOR<RideScalarRelationFilter, RideWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    rideId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paymentIntentId?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ride?: RideOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rideId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: StringFilter<"Payment"> | string
    paymentIntentId?: StringNullableFilter<"Payment"> | string | null
    stripeCustomerId?: StringNullableFilter<"Payment"> | string | null
    receiptUrl?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    ride?: XOR<RideScalarRelationFilter, RideWhereInput>
  }, "id" | "rideId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    rideId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paymentIntentId?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    rideId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: StringWithAggregatesFilter<"Payment"> | string
    paymentIntentId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    stripeCustomerId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    receiptUrl?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type RatingWhereInput = {
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    id?: StringFilter<"Rating"> | string
    rideId?: StringFilter<"Rating"> | string
    ratedByUserId?: StringFilter<"Rating"> | string
    ratedUserId?: StringFilter<"Rating"> | string
    rating?: FloatFilter<"Rating"> | number
    review?: StringNullableFilter<"Rating"> | string | null
    cleanliness?: FloatNullableFilter<"Rating"> | number | null
    drivingSkill?: FloatNullableFilter<"Rating"> | number | null
    courtesy?: FloatNullableFilter<"Rating"> | number | null
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    ride?: XOR<RideScalarRelationFilter, RideWhereInput>
    ratedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RatingOrderByWithRelationInput = {
    id?: SortOrder
    rideId?: SortOrder
    ratedByUserId?: SortOrder
    ratedUserId?: SortOrder
    rating?: SortOrder
    review?: SortOrderInput | SortOrder
    cleanliness?: SortOrderInput | SortOrder
    drivingSkill?: SortOrderInput | SortOrder
    courtesy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    ride?: RideOrderByWithRelationInput
    ratedBy?: UserOrderByWithRelationInput
  }

  export type RatingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rideId_ratedByUserId_ratedUserId?: RatingRideIdRatedByUserIdRatedUserIdCompoundUniqueInput
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    rideId?: StringFilter<"Rating"> | string
    ratedByUserId?: StringFilter<"Rating"> | string
    ratedUserId?: StringFilter<"Rating"> | string
    rating?: FloatFilter<"Rating"> | number
    review?: StringNullableFilter<"Rating"> | string | null
    cleanliness?: FloatNullableFilter<"Rating"> | number | null
    drivingSkill?: FloatNullableFilter<"Rating"> | number | null
    courtesy?: FloatNullableFilter<"Rating"> | number | null
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    ride?: XOR<RideScalarRelationFilter, RideWhereInput>
    ratedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "rideId_ratedByUserId_ratedUserId">

  export type RatingOrderByWithAggregationInput = {
    id?: SortOrder
    rideId?: SortOrder
    ratedByUserId?: SortOrder
    ratedUserId?: SortOrder
    rating?: SortOrder
    review?: SortOrderInput | SortOrder
    cleanliness?: SortOrderInput | SortOrder
    drivingSkill?: SortOrderInput | SortOrder
    courtesy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RatingCountOrderByAggregateInput
    _avg?: RatingAvgOrderByAggregateInput
    _max?: RatingMaxOrderByAggregateInput
    _min?: RatingMinOrderByAggregateInput
    _sum?: RatingSumOrderByAggregateInput
  }

  export type RatingScalarWhereWithAggregatesInput = {
    AND?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    OR?: RatingScalarWhereWithAggregatesInput[]
    NOT?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rating"> | string
    rideId?: StringWithAggregatesFilter<"Rating"> | string
    ratedByUserId?: StringWithAggregatesFilter<"Rating"> | string
    ratedUserId?: StringWithAggregatesFilter<"Rating"> | string
    rating?: FloatWithAggregatesFilter<"Rating"> | number
    review?: StringNullableWithAggregatesFilter<"Rating"> | string | null
    cleanliness?: FloatNullableWithAggregatesFilter<"Rating"> | number | null
    drivingSkill?: FloatNullableWithAggregatesFilter<"Rating"> | number | null
    courtesy?: FloatNullableWithAggregatesFilter<"Rating"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Rating"> | Date | string
  }

  export type RideLocationWhereInput = {
    AND?: RideLocationWhereInput | RideLocationWhereInput[]
    OR?: RideLocationWhereInput[]
    NOT?: RideLocationWhereInput | RideLocationWhereInput[]
    id?: StringFilter<"RideLocation"> | string
    rideId?: StringFilter<"RideLocation"> | string
    latitude?: FloatFilter<"RideLocation"> | number
    longitude?: FloatFilter<"RideLocation"> | number
    timestamp?: DateTimeFilter<"RideLocation"> | Date | string
    speed?: FloatNullableFilter<"RideLocation"> | number | null
    bearing?: FloatNullableFilter<"RideLocation"> | number | null
    accuracy?: FloatNullableFilter<"RideLocation"> | number | null
    userType?: EnumUserTypeFilter<"RideLocation"> | $Enums.UserType
    ride?: XOR<RideScalarRelationFilter, RideWhereInput>
  }

  export type RideLocationOrderByWithRelationInput = {
    id?: SortOrder
    rideId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    speed?: SortOrderInput | SortOrder
    bearing?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    userType?: SortOrder
    ride?: RideOrderByWithRelationInput
  }

  export type RideLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RideLocationWhereInput | RideLocationWhereInput[]
    OR?: RideLocationWhereInput[]
    NOT?: RideLocationWhereInput | RideLocationWhereInput[]
    rideId?: StringFilter<"RideLocation"> | string
    latitude?: FloatFilter<"RideLocation"> | number
    longitude?: FloatFilter<"RideLocation"> | number
    timestamp?: DateTimeFilter<"RideLocation"> | Date | string
    speed?: FloatNullableFilter<"RideLocation"> | number | null
    bearing?: FloatNullableFilter<"RideLocation"> | number | null
    accuracy?: FloatNullableFilter<"RideLocation"> | number | null
    userType?: EnumUserTypeFilter<"RideLocation"> | $Enums.UserType
    ride?: XOR<RideScalarRelationFilter, RideWhereInput>
  }, "id">

  export type RideLocationOrderByWithAggregationInput = {
    id?: SortOrder
    rideId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    speed?: SortOrderInput | SortOrder
    bearing?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    userType?: SortOrder
    _count?: RideLocationCountOrderByAggregateInput
    _avg?: RideLocationAvgOrderByAggregateInput
    _max?: RideLocationMaxOrderByAggregateInput
    _min?: RideLocationMinOrderByAggregateInput
    _sum?: RideLocationSumOrderByAggregateInput
  }

  export type RideLocationScalarWhereWithAggregatesInput = {
    AND?: RideLocationScalarWhereWithAggregatesInput | RideLocationScalarWhereWithAggregatesInput[]
    OR?: RideLocationScalarWhereWithAggregatesInput[]
    NOT?: RideLocationScalarWhereWithAggregatesInput | RideLocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RideLocation"> | string
    rideId?: StringWithAggregatesFilter<"RideLocation"> | string
    latitude?: FloatWithAggregatesFilter<"RideLocation"> | number
    longitude?: FloatWithAggregatesFilter<"RideLocation"> | number
    timestamp?: DateTimeWithAggregatesFilter<"RideLocation"> | Date | string
    speed?: FloatNullableWithAggregatesFilter<"RideLocation"> | number | null
    bearing?: FloatNullableWithAggregatesFilter<"RideLocation"> | number | null
    accuracy?: FloatNullableWithAggregatesFilter<"RideLocation"> | number | null
    userType?: EnumUserTypeWithAggregatesFilter<"RideLocation"> | $Enums.UserType
  }

  export type DriverDocumentWhereInput = {
    AND?: DriverDocumentWhereInput | DriverDocumentWhereInput[]
    OR?: DriverDocumentWhereInput[]
    NOT?: DriverDocumentWhereInput | DriverDocumentWhereInput[]
    id?: StringFilter<"DriverDocument"> | string
    driverId?: StringFilter<"DriverDocument"> | string
    documentType?: EnumDocumentTypeFilter<"DriverDocument"> | $Enums.DocumentType
    documentNumber?: StringNullableFilter<"DriverDocument"> | string | null
    issuedDate?: DateTimeNullableFilter<"DriverDocument"> | Date | string | null
    expiryDate?: DateTimeNullableFilter<"DriverDocument"> | Date | string | null
    isVerified?: BoolFilter<"DriverDocument"> | boolean
    verificationDate?: DateTimeNullableFilter<"DriverDocument"> | Date | string | null
    documentUrl?: StringFilter<"DriverDocument"> | string
    notes?: StringNullableFilter<"DriverDocument"> | string | null
    createdAt?: DateTimeFilter<"DriverDocument"> | Date | string
    updatedAt?: DateTimeFilter<"DriverDocument"> | Date | string
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
  }

  export type DriverDocumentOrderByWithRelationInput = {
    id?: SortOrder
    driverId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrderInput | SortOrder
    issuedDate?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrderInput | SortOrder
    documentUrl?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    driver?: DriverOrderByWithRelationInput
  }

  export type DriverDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    driverId_documentType?: DriverDocumentDriverIdDocumentTypeCompoundUniqueInput
    AND?: DriverDocumentWhereInput | DriverDocumentWhereInput[]
    OR?: DriverDocumentWhereInput[]
    NOT?: DriverDocumentWhereInput | DriverDocumentWhereInput[]
    driverId?: StringFilter<"DriverDocument"> | string
    documentType?: EnumDocumentTypeFilter<"DriverDocument"> | $Enums.DocumentType
    documentNumber?: StringNullableFilter<"DriverDocument"> | string | null
    issuedDate?: DateTimeNullableFilter<"DriverDocument"> | Date | string | null
    expiryDate?: DateTimeNullableFilter<"DriverDocument"> | Date | string | null
    isVerified?: BoolFilter<"DriverDocument"> | boolean
    verificationDate?: DateTimeNullableFilter<"DriverDocument"> | Date | string | null
    documentUrl?: StringFilter<"DriverDocument"> | string
    notes?: StringNullableFilter<"DriverDocument"> | string | null
    createdAt?: DateTimeFilter<"DriverDocument"> | Date | string
    updatedAt?: DateTimeFilter<"DriverDocument"> | Date | string
    driver?: XOR<DriverScalarRelationFilter, DriverWhereInput>
  }, "id" | "driverId_documentType">

  export type DriverDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    driverId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrderInput | SortOrder
    issuedDate?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrderInput | SortOrder
    documentUrl?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DriverDocumentCountOrderByAggregateInput
    _max?: DriverDocumentMaxOrderByAggregateInput
    _min?: DriverDocumentMinOrderByAggregateInput
  }

  export type DriverDocumentScalarWhereWithAggregatesInput = {
    AND?: DriverDocumentScalarWhereWithAggregatesInput | DriverDocumentScalarWhereWithAggregatesInput[]
    OR?: DriverDocumentScalarWhereWithAggregatesInput[]
    NOT?: DriverDocumentScalarWhereWithAggregatesInput | DriverDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DriverDocument"> | string
    driverId?: StringWithAggregatesFilter<"DriverDocument"> | string
    documentType?: EnumDocumentTypeWithAggregatesFilter<"DriverDocument"> | $Enums.DocumentType
    documentNumber?: StringNullableWithAggregatesFilter<"DriverDocument"> | string | null
    issuedDate?: DateTimeNullableWithAggregatesFilter<"DriverDocument"> | Date | string | null
    expiryDate?: DateTimeNullableWithAggregatesFilter<"DriverDocument"> | Date | string | null
    isVerified?: BoolWithAggregatesFilter<"DriverDocument"> | boolean
    verificationDate?: DateTimeNullableWithAggregatesFilter<"DriverDocument"> | Date | string | null
    documentUrl?: StringWithAggregatesFilter<"DriverDocument"> | string
    notes?: StringNullableWithAggregatesFilter<"DriverDocument"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DriverDocument"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DriverDocument"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    address?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clerkId: string
    driver?: DriverCreateNestedOneWithoutUserInput
    passenger?: PassengerCreateNestedOneWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutRatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    address?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clerkId: string
    driver?: DriverUncheckedCreateNestedOneWithoutUserInput
    passenger?: PassengerUncheckedCreateNestedOneWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutRatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    driver?: DriverUpdateOneWithoutUserNestedInput
    passenger?: PassengerUpdateOneWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutRatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    driver?: DriverUncheckedUpdateOneWithoutUserNestedInput
    passenger?: PassengerUncheckedUpdateOneWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutRatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    address?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clerkId: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
  }

  export type DriverCreateInput = {
    id?: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    user: UserCreateNestedOneWithoutDriverInput
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
    rides?: RideCreateNestedManyWithoutDriverInput
    documents?: DriverDocumentCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateInput = {
    id?: string
    userId: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverInput
    rides?: RideUncheckedCreateNestedManyWithoutDriverInput
    documents?: DriverDocumentUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDriverNestedInput
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
    rides?: RideUpdateManyWithoutDriverNestedInput
    documents?: DriverDocumentUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverNestedInput
    rides?: RideUncheckedUpdateManyWithoutDriverNestedInput
    documents?: DriverDocumentUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type DriverCreateManyInput = {
    id?: string
    userId: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
  }

  export type DriverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DriverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PassengerCreateInput = {
    id?: string
    prefersFemaleDriver?: boolean
    totalRides?: number
    averageRating?: number
    specialNeeds?: boolean
    specialNeedsDesc?: string | null
    homeAddress?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    workAddress?: string | null
    workLatitude?: number | null
    workLongitude?: number | null
    user: UserCreateNestedOneWithoutPassengerInput
    rides?: RideCreateNestedManyWithoutPassengerInput
  }

  export type PassengerUncheckedCreateInput = {
    id?: string
    userId: string
    prefersFemaleDriver?: boolean
    totalRides?: number
    averageRating?: number
    specialNeeds?: boolean
    specialNeedsDesc?: string | null
    homeAddress?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    workAddress?: string | null
    workLatitude?: number | null
    workLongitude?: number | null
    rides?: RideUncheckedCreateNestedManyWithoutPassengerInput
  }

  export type PassengerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    prefersFemaleDriver?: BoolFieldUpdateOperationsInput | boolean
    totalRides?: IntFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    specialNeeds?: BoolFieldUpdateOperationsInput | boolean
    specialNeedsDesc?: NullableStringFieldUpdateOperationsInput | string | null
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workAddress?: NullableStringFieldUpdateOperationsInput | string | null
    workLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutPassengerNestedInput
    rides?: RideUpdateManyWithoutPassengerNestedInput
  }

  export type PassengerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prefersFemaleDriver?: BoolFieldUpdateOperationsInput | boolean
    totalRides?: IntFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    specialNeeds?: BoolFieldUpdateOperationsInput | boolean
    specialNeedsDesc?: NullableStringFieldUpdateOperationsInput | string | null
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workAddress?: NullableStringFieldUpdateOperationsInput | string | null
    workLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    rides?: RideUncheckedUpdateManyWithoutPassengerNestedInput
  }

  export type PassengerCreateManyInput = {
    id?: string
    userId: string
    prefersFemaleDriver?: boolean
    totalRides?: number
    averageRating?: number
    specialNeeds?: boolean
    specialNeedsDesc?: string | null
    homeAddress?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    workAddress?: string | null
    workLatitude?: number | null
    workLongitude?: number | null
  }

  export type PassengerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    prefersFemaleDriver?: BoolFieldUpdateOperationsInput | boolean
    totalRides?: IntFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    specialNeeds?: BoolFieldUpdateOperationsInput | boolean
    specialNeedsDesc?: NullableStringFieldUpdateOperationsInput | string | null
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workAddress?: NullableStringFieldUpdateOperationsInput | string | null
    workLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PassengerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prefersFemaleDriver?: BoolFieldUpdateOperationsInput | boolean
    totalRides?: IntFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    specialNeeds?: BoolFieldUpdateOperationsInput | boolean
    specialNeedsDesc?: NullableStringFieldUpdateOperationsInput | string | null
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workAddress?: NullableStringFieldUpdateOperationsInput | string | null
    workLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type VehicleCreateInput = {
    id?: string
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
    registrationExpiryDate: Date | string
    insuranceExpiryDate: Date | string
    vehicleType: $Enums.VehicleType
    capacity: number
    accessibility?: boolean
    carImageUrl?: string | null
    features?: VehicleCreatefeaturesInput | string[]
    inspectionStatus?: $Enums.Status
    inspectionDate?: Date | string | null
    driver: DriverCreateNestedOneWithoutVehicleInput
    rides?: RideCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    driverId: string
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
    registrationExpiryDate: Date | string
    insuranceExpiryDate: Date | string
    vehicleType: $Enums.VehicleType
    capacity: number
    accessibility?: boolean
    carImageUrl?: string | null
    features?: VehicleCreatefeaturesInput | string[]
    inspectionStatus?: $Enums.Status
    inspectionDate?: Date | string | null
    rides?: RideUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    registrationExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleType?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: IntFieldUpdateOperationsInput | number
    accessibility?: BoolFieldUpdateOperationsInput | boolean
    carImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    features?: VehicleUpdatefeaturesInput | string[]
    inspectionStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    inspectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneRequiredWithoutVehicleNestedInput
    rides?: RideUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    registrationExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleType?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: IntFieldUpdateOperationsInput | number
    accessibility?: BoolFieldUpdateOperationsInput | boolean
    carImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    features?: VehicleUpdatefeaturesInput | string[]
    inspectionStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    inspectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rides?: RideUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    driverId: string
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
    registrationExpiryDate: Date | string
    insuranceExpiryDate: Date | string
    vehicleType: $Enums.VehicleType
    capacity: number
    accessibility?: boolean
    carImageUrl?: string | null
    features?: VehicleCreatefeaturesInput | string[]
    inspectionStatus?: $Enums.Status
    inspectionDate?: Date | string | null
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    registrationExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleType?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: IntFieldUpdateOperationsInput | number
    accessibility?: BoolFieldUpdateOperationsInput | boolean
    carImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    features?: VehicleUpdatefeaturesInput | string[]
    inspectionStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    inspectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    registrationExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleType?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: IntFieldUpdateOperationsInput | number
    accessibility?: BoolFieldUpdateOperationsInput | boolean
    carImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    features?: VehicleUpdatefeaturesInput | string[]
    inspectionStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    inspectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RideCreateInput = {
    id?: string
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: PassengerCreateNestedOneWithoutRidesInput
    driver?: DriverCreateNestedOneWithoutRidesInput
    vehicle?: VehicleCreateNestedOneWithoutRidesInput
    ratings?: RatingCreateNestedManyWithoutRideInput
    payment?: PaymentCreateNestedOneWithoutRideInput
    locations?: RideLocationCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateInput = {
    id?: string
    passengerId: string
    driverId?: string | null
    vehicleId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutRideInput
    payment?: PaymentUncheckedCreateNestedOneWithoutRideInput
    locations?: RideLocationUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: PassengerUpdateOneRequiredWithoutRidesNestedInput
    driver?: DriverUpdateOneWithoutRidesNestedInput
    vehicle?: VehicleUpdateOneWithoutRidesNestedInput
    ratings?: RatingUpdateManyWithoutRideNestedInput
    payment?: PaymentUpdateOneWithoutRideNestedInput
    locations?: RideLocationUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutRideNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutRideNestedInput
    locations?: RideLocationUncheckedUpdateManyWithoutRideNestedInput
  }

  export type RideCreateManyInput = {
    id?: string
    passengerId: string
    driverId?: string | null
    vehicleId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod: string
    paymentIntentId?: string | null
    stripeCustomerId?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ride: RideCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    rideId: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod: string
    paymentIntentId?: string | null
    stripeCustomerId?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ride?: RideUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    rideId: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod: string
    paymentIntentId?: string | null
    stripeCustomerId?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateInput = {
    id?: string
    ratedUserId: string
    rating: number
    review?: string | null
    cleanliness?: number | null
    drivingSkill?: number | null
    courtesy?: number | null
    createdAt?: Date | string
    ride: RideCreateNestedOneWithoutRatingsInput
    ratedBy: UserCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateInput = {
    id?: string
    rideId: string
    ratedByUserId: string
    ratedUserId: string
    rating: number
    review?: string | null
    cleanliness?: number | null
    drivingSkill?: number | null
    courtesy?: number | null
    createdAt?: Date | string
  }

  export type RatingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ride?: RideUpdateOneRequiredWithoutRatingsNestedInput
    ratedBy?: UserUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    ratedByUserId?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateManyInput = {
    id?: string
    rideId: string
    ratedByUserId: string
    ratedUserId: string
    rating: number
    review?: string | null
    cleanliness?: number | null
    drivingSkill?: number | null
    courtesy?: number | null
    createdAt?: Date | string
  }

  export type RatingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    ratedByUserId?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideLocationCreateInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
    speed?: number | null
    bearing?: number | null
    accuracy?: number | null
    userType: $Enums.UserType
    ride: RideCreateNestedOneWithoutLocationsInput
  }

  export type RideLocationUncheckedCreateInput = {
    id?: string
    rideId: string
    latitude: number
    longitude: number
    timestamp?: Date | string
    speed?: number | null
    bearing?: number | null
    accuracy?: number | null
    userType: $Enums.UserType
  }

  export type RideLocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    bearing?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    ride?: RideUpdateOneRequiredWithoutLocationsNestedInput
  }

  export type RideLocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    bearing?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type RideLocationCreateManyInput = {
    id?: string
    rideId: string
    latitude: number
    longitude: number
    timestamp?: Date | string
    speed?: number | null
    bearing?: number | null
    accuracy?: number | null
    userType: $Enums.UserType
  }

  export type RideLocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    bearing?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type RideLocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    bearing?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type DriverDocumentCreateInput = {
    id?: string
    documentType: $Enums.DocumentType
    documentNumber?: string | null
    issuedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
    verificationDate?: Date | string | null
    documentUrl: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driver: DriverCreateNestedOneWithoutDocumentsInput
  }

  export type DriverDocumentUncheckedCreateInput = {
    id?: string
    driverId: string
    documentType: $Enums.DocumentType
    documentNumber?: string | null
    issuedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
    verificationDate?: Date | string | null
    documentUrl: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DriverDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverDocumentCreateManyInput = {
    id?: string
    driverId: string
    documentType: $Enums.DocumentType
    documentNumber?: string | null
    issuedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
    verificationDate?: Date | string | null
    documentUrl: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DriverNullableScalarRelationFilter = {
    is?: DriverWhereInput | null
    isNot?: DriverWhereInput | null
  }

  export type PassengerNullableScalarRelationFilter = {
    is?: PassengerWhereInput | null
    isNot?: PassengerWhereInput | null
  }

  export type RatingListRelationFilter = {
    every?: RatingWhereInput
    some?: RatingWhereInput
    none?: RatingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RatingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    profileImage?: SortOrder
    address?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    clerkId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    profileImage?: SortOrder
    address?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    clerkId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    profileImage?: SortOrder
    address?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    clerkId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type VehicleNullableScalarRelationFilter = {
    is?: VehicleWhereInput | null
    isNot?: VehicleWhereInput | null
  }

  export type RideListRelationFilter = {
    every?: RideWhereInput
    some?: RideWhereInput
    none?: RideWhereInput
  }

  export type DriverDocumentListRelationFilter = {
    every?: DriverDocumentWhereInput
    some?: DriverDocumentWhereInput
    none?: DriverDocumentWhereInput
  }

  export type RideOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DriverDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DriverCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiryDate?: SortOrder
    isAvailable?: SortOrder
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
    averageRating?: SortOrder
    totalRides?: SortOrder
    accountStatus?: SortOrder
    backgroundCheckStatus?: SortOrder
    backgroundCheckDate?: SortOrder
    isOnline?: SortOrder
    acceptsFemaleOnly?: SortOrder
    bankAccount?: SortOrder
  }

  export type DriverAvgOrderByAggregateInput = {
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
    averageRating?: SortOrder
    totalRides?: SortOrder
  }

  export type DriverMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiryDate?: SortOrder
    isAvailable?: SortOrder
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
    averageRating?: SortOrder
    totalRides?: SortOrder
    accountStatus?: SortOrder
    backgroundCheckStatus?: SortOrder
    backgroundCheckDate?: SortOrder
    isOnline?: SortOrder
    acceptsFemaleOnly?: SortOrder
    bankAccount?: SortOrder
  }

  export type DriverMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiryDate?: SortOrder
    isAvailable?: SortOrder
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
    averageRating?: SortOrder
    totalRides?: SortOrder
    accountStatus?: SortOrder
    backgroundCheckStatus?: SortOrder
    backgroundCheckDate?: SortOrder
    isOnline?: SortOrder
    acceptsFemaleOnly?: SortOrder
    bankAccount?: SortOrder
  }

  export type DriverSumOrderByAggregateInput = {
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
    averageRating?: SortOrder
    totalRides?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type PassengerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    prefersFemaleDriver?: SortOrder
    totalRides?: SortOrder
    averageRating?: SortOrder
    specialNeeds?: SortOrder
    specialNeedsDesc?: SortOrder
    homeAddress?: SortOrder
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
    workAddress?: SortOrder
    workLatitude?: SortOrder
    workLongitude?: SortOrder
  }

  export type PassengerAvgOrderByAggregateInput = {
    totalRides?: SortOrder
    averageRating?: SortOrder
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
    workLatitude?: SortOrder
    workLongitude?: SortOrder
  }

  export type PassengerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    prefersFemaleDriver?: SortOrder
    totalRides?: SortOrder
    averageRating?: SortOrder
    specialNeeds?: SortOrder
    specialNeedsDesc?: SortOrder
    homeAddress?: SortOrder
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
    workAddress?: SortOrder
    workLatitude?: SortOrder
    workLongitude?: SortOrder
  }

  export type PassengerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    prefersFemaleDriver?: SortOrder
    totalRides?: SortOrder
    averageRating?: SortOrder
    specialNeeds?: SortOrder
    specialNeedsDesc?: SortOrder
    homeAddress?: SortOrder
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
    workAddress?: SortOrder
    workLatitude?: SortOrder
    workLongitude?: SortOrder
  }

  export type PassengerSumOrderByAggregateInput = {
    totalRides?: SortOrder
    averageRating?: SortOrder
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
    workLatitude?: SortOrder
    workLongitude?: SortOrder
  }

  export type EnumVehicleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeFilter<$PrismaModel> | $Enums.VehicleType
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DriverScalarRelationFilter = {
    is?: DriverWhereInput
    isNot?: DriverWhereInput
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    licensePlate?: SortOrder
    registrationExpiryDate?: SortOrder
    insuranceExpiryDate?: SortOrder
    vehicleType?: SortOrder
    capacity?: SortOrder
    accessibility?: SortOrder
    carImageUrl?: SortOrder
    features?: SortOrder
    inspectionStatus?: SortOrder
    inspectionDate?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    year?: SortOrder
    capacity?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    licensePlate?: SortOrder
    registrationExpiryDate?: SortOrder
    insuranceExpiryDate?: SortOrder
    vehicleType?: SortOrder
    capacity?: SortOrder
    accessibility?: SortOrder
    carImageUrl?: SortOrder
    inspectionStatus?: SortOrder
    inspectionDate?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    licensePlate?: SortOrder
    registrationExpiryDate?: SortOrder
    insuranceExpiryDate?: SortOrder
    vehicleType?: SortOrder
    capacity?: SortOrder
    accessibility?: SortOrder
    carImageUrl?: SortOrder
    inspectionStatus?: SortOrder
    inspectionDate?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    year?: SortOrder
    capacity?: SortOrder
  }

  export type EnumVehicleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleTypeFilter<$PrismaModel>
    _max?: NestedEnumVehicleTypeFilter<$PrismaModel>
  }

  export type EnumRideStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRideStatusFilter<$PrismaModel> | $Enums.RideStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type EnumRideTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RideType | EnumRideTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RideType[] | ListEnumRideTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideType[] | ListEnumRideTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRideTypeFilter<$PrismaModel> | $Enums.RideType
  }

  export type PassengerScalarRelationFilter = {
    is?: PassengerWhereInput
    isNot?: PassengerWhereInput
  }

  export type PaymentNullableScalarRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type RideLocationListRelationFilter = {
    every?: RideLocationWhereInput
    some?: RideLocationWhereInput
    none?: RideLocationWhereInput
  }

  export type RideLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RideCountOrderByAggregateInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrder
    vehicleId?: SortOrder
    status?: SortOrder
    requestTime?: SortOrder
    acceptTime?: SortOrder
    pickupTime?: SortOrder
    dropOffTime?: SortOrder
    originAddress?: SortOrder
    originLatitude?: SortOrder
    originLongitude?: SortOrder
    destinationAddress?: SortOrder
    destinationLatitude?: SortOrder
    destinationLongitude?: SortOrder
    estimatedDuration?: SortOrder
    actualDuration?: SortOrder
    estimatedDistance?: SortOrder
    actualDistance?: SortOrder
    basePrice?: SortOrder
    finalPrice?: SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paymentMethodId?: SortOrder
    cancellationReason?: SortOrder
    cancellationTime?: SortOrder
    cancellationFee?: SortOrder
    isFemaleOnlyRide?: SortOrder
    specialRequirements?: SortOrder
    baggageQuantity?: SortOrder
    rideType?: SortOrder
    scheduledTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RideAvgOrderByAggregateInput = {
    originLatitude?: SortOrder
    originLongitude?: SortOrder
    destinationLatitude?: SortOrder
    destinationLongitude?: SortOrder
    estimatedDuration?: SortOrder
    actualDuration?: SortOrder
    estimatedDistance?: SortOrder
    actualDistance?: SortOrder
    basePrice?: SortOrder
    finalPrice?: SortOrder
    cancellationFee?: SortOrder
    baggageQuantity?: SortOrder
  }

  export type RideMaxOrderByAggregateInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrder
    vehicleId?: SortOrder
    status?: SortOrder
    requestTime?: SortOrder
    acceptTime?: SortOrder
    pickupTime?: SortOrder
    dropOffTime?: SortOrder
    originAddress?: SortOrder
    originLatitude?: SortOrder
    originLongitude?: SortOrder
    destinationAddress?: SortOrder
    destinationLatitude?: SortOrder
    destinationLongitude?: SortOrder
    estimatedDuration?: SortOrder
    actualDuration?: SortOrder
    estimatedDistance?: SortOrder
    actualDistance?: SortOrder
    basePrice?: SortOrder
    finalPrice?: SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paymentMethodId?: SortOrder
    cancellationReason?: SortOrder
    cancellationTime?: SortOrder
    cancellationFee?: SortOrder
    isFemaleOnlyRide?: SortOrder
    specialRequirements?: SortOrder
    baggageQuantity?: SortOrder
    rideType?: SortOrder
    scheduledTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RideMinOrderByAggregateInput = {
    id?: SortOrder
    passengerId?: SortOrder
    driverId?: SortOrder
    vehicleId?: SortOrder
    status?: SortOrder
    requestTime?: SortOrder
    acceptTime?: SortOrder
    pickupTime?: SortOrder
    dropOffTime?: SortOrder
    originAddress?: SortOrder
    originLatitude?: SortOrder
    originLongitude?: SortOrder
    destinationAddress?: SortOrder
    destinationLatitude?: SortOrder
    destinationLongitude?: SortOrder
    estimatedDuration?: SortOrder
    actualDuration?: SortOrder
    estimatedDistance?: SortOrder
    actualDistance?: SortOrder
    basePrice?: SortOrder
    finalPrice?: SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paymentMethodId?: SortOrder
    cancellationReason?: SortOrder
    cancellationTime?: SortOrder
    cancellationFee?: SortOrder
    isFemaleOnlyRide?: SortOrder
    specialRequirements?: SortOrder
    baggageQuantity?: SortOrder
    rideType?: SortOrder
    scheduledTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RideSumOrderByAggregateInput = {
    originLatitude?: SortOrder
    originLongitude?: SortOrder
    destinationLatitude?: SortOrder
    destinationLongitude?: SortOrder
    estimatedDuration?: SortOrder
    actualDuration?: SortOrder
    estimatedDistance?: SortOrder
    actualDistance?: SortOrder
    basePrice?: SortOrder
    finalPrice?: SortOrder
    cancellationFee?: SortOrder
    baggageQuantity?: SortOrder
  }

  export type EnumRideStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRideStatusWithAggregatesFilter<$PrismaModel> | $Enums.RideStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRideStatusFilter<$PrismaModel>
    _max?: NestedEnumRideStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumRideTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideType | EnumRideTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RideType[] | ListEnumRideTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideType[] | ListEnumRideTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRideTypeWithAggregatesFilter<$PrismaModel> | $Enums.RideType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRideTypeFilter<$PrismaModel>
    _max?: NestedEnumRideTypeFilter<$PrismaModel>
  }

  export type RideScalarRelationFilter = {
    is?: RideWhereInput
    isNot?: RideWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paymentIntentId?: SortOrder
    stripeCustomerId?: SortOrder
    receiptUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paymentIntentId?: SortOrder
    stripeCustomerId?: SortOrder
    receiptUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paymentIntentId?: SortOrder
    stripeCustomerId?: SortOrder
    receiptUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type RatingRideIdRatedByUserIdRatedUserIdCompoundUniqueInput = {
    rideId: string
    ratedByUserId: string
    ratedUserId: string
  }

  export type RatingCountOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    ratedByUserId?: SortOrder
    ratedUserId?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    cleanliness?: SortOrder
    drivingSkill?: SortOrder
    courtesy?: SortOrder
    createdAt?: SortOrder
  }

  export type RatingAvgOrderByAggregateInput = {
    rating?: SortOrder
    cleanliness?: SortOrder
    drivingSkill?: SortOrder
    courtesy?: SortOrder
  }

  export type RatingMaxOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    ratedByUserId?: SortOrder
    ratedUserId?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    cleanliness?: SortOrder
    drivingSkill?: SortOrder
    courtesy?: SortOrder
    createdAt?: SortOrder
  }

  export type RatingMinOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    ratedByUserId?: SortOrder
    ratedUserId?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    cleanliness?: SortOrder
    drivingSkill?: SortOrder
    courtesy?: SortOrder
    createdAt?: SortOrder
  }

  export type RatingSumOrderByAggregateInput = {
    rating?: SortOrder
    cleanliness?: SortOrder
    drivingSkill?: SortOrder
    courtesy?: SortOrder
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type RideLocationCountOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    speed?: SortOrder
    bearing?: SortOrder
    accuracy?: SortOrder
    userType?: SortOrder
  }

  export type RideLocationAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    bearing?: SortOrder
    accuracy?: SortOrder
  }

  export type RideLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    speed?: SortOrder
    bearing?: SortOrder
    accuracy?: SortOrder
    userType?: SortOrder
  }

  export type RideLocationMinOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    speed?: SortOrder
    bearing?: SortOrder
    accuracy?: SortOrder
    userType?: SortOrder
  }

  export type RideLocationSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    bearing?: SortOrder
    accuracy?: SortOrder
  }

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type EnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type DriverDocumentDriverIdDocumentTypeCompoundUniqueInput = {
    driverId: string
    documentType: $Enums.DocumentType
  }

  export type DriverDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    issuedDate?: SortOrder
    expiryDate?: SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrder
    documentUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    issuedDate?: SortOrder
    expiryDate?: SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrder
    documentUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    driverId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    issuedDate?: SortOrder
    expiryDate?: SortOrder
    isVerified?: SortOrder
    verificationDate?: SortOrder
    documentUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type DriverCreateNestedOneWithoutUserInput = {
    create?: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverCreateOrConnectWithoutUserInput
    connect?: DriverWhereUniqueInput
  }

  export type PassengerCreateNestedOneWithoutUserInput = {
    create?: XOR<PassengerCreateWithoutUserInput, PassengerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PassengerCreateOrConnectWithoutUserInput
    connect?: PassengerWhereUniqueInput
  }

  export type RatingCreateNestedManyWithoutRatedByInput = {
    create?: XOR<RatingCreateWithoutRatedByInput, RatingUncheckedCreateWithoutRatedByInput> | RatingCreateWithoutRatedByInput[] | RatingUncheckedCreateWithoutRatedByInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutRatedByInput | RatingCreateOrConnectWithoutRatedByInput[]
    createMany?: RatingCreateManyRatedByInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type DriverUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverCreateOrConnectWithoutUserInput
    connect?: DriverWhereUniqueInput
  }

  export type PassengerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PassengerCreateWithoutUserInput, PassengerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PassengerCreateOrConnectWithoutUserInput
    connect?: PassengerWhereUniqueInput
  }

  export type RatingUncheckedCreateNestedManyWithoutRatedByInput = {
    create?: XOR<RatingCreateWithoutRatedByInput, RatingUncheckedCreateWithoutRatedByInput> | RatingCreateWithoutRatedByInput[] | RatingUncheckedCreateWithoutRatedByInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutRatedByInput | RatingCreateOrConnectWithoutRatedByInput[]
    createMany?: RatingCreateManyRatedByInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DriverUpdateOneWithoutUserNestedInput = {
    create?: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverCreateOrConnectWithoutUserInput
    upsert?: DriverUpsertWithoutUserInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutUserInput, DriverUpdateWithoutUserInput>, DriverUncheckedUpdateWithoutUserInput>
  }

  export type PassengerUpdateOneWithoutUserNestedInput = {
    create?: XOR<PassengerCreateWithoutUserInput, PassengerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PassengerCreateOrConnectWithoutUserInput
    upsert?: PassengerUpsertWithoutUserInput
    disconnect?: PassengerWhereInput | boolean
    delete?: PassengerWhereInput | boolean
    connect?: PassengerWhereUniqueInput
    update?: XOR<XOR<PassengerUpdateToOneWithWhereWithoutUserInput, PassengerUpdateWithoutUserInput>, PassengerUncheckedUpdateWithoutUserInput>
  }

  export type RatingUpdateManyWithoutRatedByNestedInput = {
    create?: XOR<RatingCreateWithoutRatedByInput, RatingUncheckedCreateWithoutRatedByInput> | RatingCreateWithoutRatedByInput[] | RatingUncheckedCreateWithoutRatedByInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutRatedByInput | RatingCreateOrConnectWithoutRatedByInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutRatedByInput | RatingUpsertWithWhereUniqueWithoutRatedByInput[]
    createMany?: RatingCreateManyRatedByInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutRatedByInput | RatingUpdateWithWhereUniqueWithoutRatedByInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutRatedByInput | RatingUpdateManyWithWhereWithoutRatedByInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type DriverUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverCreateOrConnectWithoutUserInput
    upsert?: DriverUpsertWithoutUserInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutUserInput, DriverUpdateWithoutUserInput>, DriverUncheckedUpdateWithoutUserInput>
  }

  export type PassengerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PassengerCreateWithoutUserInput, PassengerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PassengerCreateOrConnectWithoutUserInput
    upsert?: PassengerUpsertWithoutUserInput
    disconnect?: PassengerWhereInput | boolean
    delete?: PassengerWhereInput | boolean
    connect?: PassengerWhereUniqueInput
    update?: XOR<XOR<PassengerUpdateToOneWithWhereWithoutUserInput, PassengerUpdateWithoutUserInput>, PassengerUncheckedUpdateWithoutUserInput>
  }

  export type RatingUncheckedUpdateManyWithoutRatedByNestedInput = {
    create?: XOR<RatingCreateWithoutRatedByInput, RatingUncheckedCreateWithoutRatedByInput> | RatingCreateWithoutRatedByInput[] | RatingUncheckedCreateWithoutRatedByInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutRatedByInput | RatingCreateOrConnectWithoutRatedByInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutRatedByInput | RatingUpsertWithWhereUniqueWithoutRatedByInput[]
    createMany?: RatingCreateManyRatedByInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutRatedByInput | RatingUpdateWithWhereUniqueWithoutRatedByInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutRatedByInput | RatingUpdateManyWithWhereWithoutRatedByInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDriverInput = {
    create?: XOR<UserCreateWithoutDriverInput, UserUncheckedCreateWithoutDriverInput>
    connectOrCreate?: UserCreateOrConnectWithoutDriverInput
    connect?: UserWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutDriverInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    connect?: VehicleWhereUniqueInput
  }

  export type RideCreateNestedManyWithoutDriverInput = {
    create?: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput> | RideCreateWithoutDriverInput[] | RideUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RideCreateOrConnectWithoutDriverInput | RideCreateOrConnectWithoutDriverInput[]
    createMany?: RideCreateManyDriverInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type DriverDocumentCreateNestedManyWithoutDriverInput = {
    create?: XOR<DriverDocumentCreateWithoutDriverInput, DriverDocumentUncheckedCreateWithoutDriverInput> | DriverDocumentCreateWithoutDriverInput[] | DriverDocumentUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: DriverDocumentCreateOrConnectWithoutDriverInput | DriverDocumentCreateOrConnectWithoutDriverInput[]
    createMany?: DriverDocumentCreateManyDriverInputEnvelope
    connect?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
  }

  export type VehicleUncheckedCreateNestedOneWithoutDriverInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    connect?: VehicleWhereUniqueInput
  }

  export type RideUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput> | RideCreateWithoutDriverInput[] | RideUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RideCreateOrConnectWithoutDriverInput | RideCreateOrConnectWithoutDriverInput[]
    createMany?: RideCreateManyDriverInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type DriverDocumentUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<DriverDocumentCreateWithoutDriverInput, DriverDocumentUncheckedCreateWithoutDriverInput> | DriverDocumentCreateWithoutDriverInput[] | DriverDocumentUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: DriverDocumentCreateOrConnectWithoutDriverInput | DriverDocumentCreateOrConnectWithoutDriverInput[]
    createMany?: DriverDocumentCreateManyDriverInputEnvelope
    connect?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type UserUpdateOneRequiredWithoutDriverNestedInput = {
    create?: XOR<UserCreateWithoutDriverInput, UserUncheckedCreateWithoutDriverInput>
    connectOrCreate?: UserCreateOrConnectWithoutDriverInput
    upsert?: UserUpsertWithoutDriverInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDriverInput, UserUpdateWithoutDriverInput>, UserUncheckedUpdateWithoutDriverInput>
  }

  export type VehicleUpdateOneWithoutDriverNestedInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    upsert?: VehicleUpsertWithoutDriverInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutDriverInput, VehicleUpdateWithoutDriverInput>, VehicleUncheckedUpdateWithoutDriverInput>
  }

  export type RideUpdateManyWithoutDriverNestedInput = {
    create?: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput> | RideCreateWithoutDriverInput[] | RideUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RideCreateOrConnectWithoutDriverInput | RideCreateOrConnectWithoutDriverInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutDriverInput | RideUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: RideCreateManyDriverInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutDriverInput | RideUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: RideUpdateManyWithWhereWithoutDriverInput | RideUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type DriverDocumentUpdateManyWithoutDriverNestedInput = {
    create?: XOR<DriverDocumentCreateWithoutDriverInput, DriverDocumentUncheckedCreateWithoutDriverInput> | DriverDocumentCreateWithoutDriverInput[] | DriverDocumentUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: DriverDocumentCreateOrConnectWithoutDriverInput | DriverDocumentCreateOrConnectWithoutDriverInput[]
    upsert?: DriverDocumentUpsertWithWhereUniqueWithoutDriverInput | DriverDocumentUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: DriverDocumentCreateManyDriverInputEnvelope
    set?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
    disconnect?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
    delete?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
    connect?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
    update?: DriverDocumentUpdateWithWhereUniqueWithoutDriverInput | DriverDocumentUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: DriverDocumentUpdateManyWithWhereWithoutDriverInput | DriverDocumentUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: DriverDocumentScalarWhereInput | DriverDocumentScalarWhereInput[]
  }

  export type VehicleUncheckedUpdateOneWithoutDriverNestedInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    upsert?: VehicleUpsertWithoutDriverInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutDriverInput, VehicleUpdateWithoutDriverInput>, VehicleUncheckedUpdateWithoutDriverInput>
  }

  export type RideUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput> | RideCreateWithoutDriverInput[] | RideUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RideCreateOrConnectWithoutDriverInput | RideCreateOrConnectWithoutDriverInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutDriverInput | RideUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: RideCreateManyDriverInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutDriverInput | RideUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: RideUpdateManyWithWhereWithoutDriverInput | RideUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type DriverDocumentUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<DriverDocumentCreateWithoutDriverInput, DriverDocumentUncheckedCreateWithoutDriverInput> | DriverDocumentCreateWithoutDriverInput[] | DriverDocumentUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: DriverDocumentCreateOrConnectWithoutDriverInput | DriverDocumentCreateOrConnectWithoutDriverInput[]
    upsert?: DriverDocumentUpsertWithWhereUniqueWithoutDriverInput | DriverDocumentUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: DriverDocumentCreateManyDriverInputEnvelope
    set?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
    disconnect?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
    delete?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
    connect?: DriverDocumentWhereUniqueInput | DriverDocumentWhereUniqueInput[]
    update?: DriverDocumentUpdateWithWhereUniqueWithoutDriverInput | DriverDocumentUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: DriverDocumentUpdateManyWithWhereWithoutDriverInput | DriverDocumentUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: DriverDocumentScalarWhereInput | DriverDocumentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPassengerInput = {
    create?: XOR<UserCreateWithoutPassengerInput, UserUncheckedCreateWithoutPassengerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPassengerInput
    connect?: UserWhereUniqueInput
  }

  export type RideCreateNestedManyWithoutPassengerInput = {
    create?: XOR<RideCreateWithoutPassengerInput, RideUncheckedCreateWithoutPassengerInput> | RideCreateWithoutPassengerInput[] | RideUncheckedCreateWithoutPassengerInput[]
    connectOrCreate?: RideCreateOrConnectWithoutPassengerInput | RideCreateOrConnectWithoutPassengerInput[]
    createMany?: RideCreateManyPassengerInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type RideUncheckedCreateNestedManyWithoutPassengerInput = {
    create?: XOR<RideCreateWithoutPassengerInput, RideUncheckedCreateWithoutPassengerInput> | RideCreateWithoutPassengerInput[] | RideUncheckedCreateWithoutPassengerInput[]
    connectOrCreate?: RideCreateOrConnectWithoutPassengerInput | RideCreateOrConnectWithoutPassengerInput[]
    createMany?: RideCreateManyPassengerInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPassengerNestedInput = {
    create?: XOR<UserCreateWithoutPassengerInput, UserUncheckedCreateWithoutPassengerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPassengerInput
    upsert?: UserUpsertWithoutPassengerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPassengerInput, UserUpdateWithoutPassengerInput>, UserUncheckedUpdateWithoutPassengerInput>
  }

  export type RideUpdateManyWithoutPassengerNestedInput = {
    create?: XOR<RideCreateWithoutPassengerInput, RideUncheckedCreateWithoutPassengerInput> | RideCreateWithoutPassengerInput[] | RideUncheckedCreateWithoutPassengerInput[]
    connectOrCreate?: RideCreateOrConnectWithoutPassengerInput | RideCreateOrConnectWithoutPassengerInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutPassengerInput | RideUpsertWithWhereUniqueWithoutPassengerInput[]
    createMany?: RideCreateManyPassengerInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutPassengerInput | RideUpdateWithWhereUniqueWithoutPassengerInput[]
    updateMany?: RideUpdateManyWithWhereWithoutPassengerInput | RideUpdateManyWithWhereWithoutPassengerInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type RideUncheckedUpdateManyWithoutPassengerNestedInput = {
    create?: XOR<RideCreateWithoutPassengerInput, RideUncheckedCreateWithoutPassengerInput> | RideCreateWithoutPassengerInput[] | RideUncheckedCreateWithoutPassengerInput[]
    connectOrCreate?: RideCreateOrConnectWithoutPassengerInput | RideCreateOrConnectWithoutPassengerInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutPassengerInput | RideUpsertWithWhereUniqueWithoutPassengerInput[]
    createMany?: RideCreateManyPassengerInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutPassengerInput | RideUpdateWithWhereUniqueWithoutPassengerInput[]
    updateMany?: RideUpdateManyWithWhereWithoutPassengerInput | RideUpdateManyWithWhereWithoutPassengerInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type VehicleCreatefeaturesInput = {
    set: string[]
  }

  export type DriverCreateNestedOneWithoutVehicleInput = {
    create?: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverCreateOrConnectWithoutVehicleInput
    connect?: DriverWhereUniqueInput
  }

  export type RideCreateNestedManyWithoutVehicleInput = {
    create?: XOR<RideCreateWithoutVehicleInput, RideUncheckedCreateWithoutVehicleInput> | RideCreateWithoutVehicleInput[] | RideUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RideCreateOrConnectWithoutVehicleInput | RideCreateOrConnectWithoutVehicleInput[]
    createMany?: RideCreateManyVehicleInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type RideUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<RideCreateWithoutVehicleInput, RideUncheckedCreateWithoutVehicleInput> | RideCreateWithoutVehicleInput[] | RideUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RideCreateOrConnectWithoutVehicleInput | RideCreateOrConnectWithoutVehicleInput[]
    createMany?: RideCreateManyVehicleInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type EnumVehicleTypeFieldUpdateOperationsInput = {
    set?: $Enums.VehicleType
  }

  export type VehicleUpdatefeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DriverUpdateOneRequiredWithoutVehicleNestedInput = {
    create?: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverCreateOrConnectWithoutVehicleInput
    upsert?: DriverUpsertWithoutVehicleInput
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutVehicleInput, DriverUpdateWithoutVehicleInput>, DriverUncheckedUpdateWithoutVehicleInput>
  }

  export type RideUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<RideCreateWithoutVehicleInput, RideUncheckedCreateWithoutVehicleInput> | RideCreateWithoutVehicleInput[] | RideUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RideCreateOrConnectWithoutVehicleInput | RideCreateOrConnectWithoutVehicleInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutVehicleInput | RideUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: RideCreateManyVehicleInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutVehicleInput | RideUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: RideUpdateManyWithWhereWithoutVehicleInput | RideUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type RideUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<RideCreateWithoutVehicleInput, RideUncheckedCreateWithoutVehicleInput> | RideCreateWithoutVehicleInput[] | RideUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: RideCreateOrConnectWithoutVehicleInput | RideCreateOrConnectWithoutVehicleInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutVehicleInput | RideUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: RideCreateManyVehicleInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutVehicleInput | RideUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: RideUpdateManyWithWhereWithoutVehicleInput | RideUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type PassengerCreateNestedOneWithoutRidesInput = {
    create?: XOR<PassengerCreateWithoutRidesInput, PassengerUncheckedCreateWithoutRidesInput>
    connectOrCreate?: PassengerCreateOrConnectWithoutRidesInput
    connect?: PassengerWhereUniqueInput
  }

  export type DriverCreateNestedOneWithoutRidesInput = {
    create?: XOR<DriverCreateWithoutRidesInput, DriverUncheckedCreateWithoutRidesInput>
    connectOrCreate?: DriverCreateOrConnectWithoutRidesInput
    connect?: DriverWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutRidesInput = {
    create?: XOR<VehicleCreateWithoutRidesInput, VehicleUncheckedCreateWithoutRidesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutRidesInput
    connect?: VehicleWhereUniqueInput
  }

  export type RatingCreateNestedManyWithoutRideInput = {
    create?: XOR<RatingCreateWithoutRideInput, RatingUncheckedCreateWithoutRideInput> | RatingCreateWithoutRideInput[] | RatingUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutRideInput | RatingCreateOrConnectWithoutRideInput[]
    createMany?: RatingCreateManyRideInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type PaymentCreateNestedOneWithoutRideInput = {
    create?: XOR<PaymentCreateWithoutRideInput, PaymentUncheckedCreateWithoutRideInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutRideInput
    connect?: PaymentWhereUniqueInput
  }

  export type RideLocationCreateNestedManyWithoutRideInput = {
    create?: XOR<RideLocationCreateWithoutRideInput, RideLocationUncheckedCreateWithoutRideInput> | RideLocationCreateWithoutRideInput[] | RideLocationUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RideLocationCreateOrConnectWithoutRideInput | RideLocationCreateOrConnectWithoutRideInput[]
    createMany?: RideLocationCreateManyRideInputEnvelope
    connect?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutRideInput = {
    create?: XOR<RatingCreateWithoutRideInput, RatingUncheckedCreateWithoutRideInput> | RatingCreateWithoutRideInput[] | RatingUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutRideInput | RatingCreateOrConnectWithoutRideInput[]
    createMany?: RatingCreateManyRideInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedOneWithoutRideInput = {
    create?: XOR<PaymentCreateWithoutRideInput, PaymentUncheckedCreateWithoutRideInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutRideInput
    connect?: PaymentWhereUniqueInput
  }

  export type RideLocationUncheckedCreateNestedManyWithoutRideInput = {
    create?: XOR<RideLocationCreateWithoutRideInput, RideLocationUncheckedCreateWithoutRideInput> | RideLocationCreateWithoutRideInput[] | RideLocationUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RideLocationCreateOrConnectWithoutRideInput | RideLocationCreateOrConnectWithoutRideInput[]
    createMany?: RideLocationCreateManyRideInputEnvelope
    connect?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
  }

  export type EnumRideStatusFieldUpdateOperationsInput = {
    set?: $Enums.RideStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type EnumRideTypeFieldUpdateOperationsInput = {
    set?: $Enums.RideType
  }

  export type PassengerUpdateOneRequiredWithoutRidesNestedInput = {
    create?: XOR<PassengerCreateWithoutRidesInput, PassengerUncheckedCreateWithoutRidesInput>
    connectOrCreate?: PassengerCreateOrConnectWithoutRidesInput
    upsert?: PassengerUpsertWithoutRidesInput
    connect?: PassengerWhereUniqueInput
    update?: XOR<XOR<PassengerUpdateToOneWithWhereWithoutRidesInput, PassengerUpdateWithoutRidesInput>, PassengerUncheckedUpdateWithoutRidesInput>
  }

  export type DriverUpdateOneWithoutRidesNestedInput = {
    create?: XOR<DriverCreateWithoutRidesInput, DriverUncheckedCreateWithoutRidesInput>
    connectOrCreate?: DriverCreateOrConnectWithoutRidesInput
    upsert?: DriverUpsertWithoutRidesInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutRidesInput, DriverUpdateWithoutRidesInput>, DriverUncheckedUpdateWithoutRidesInput>
  }

  export type VehicleUpdateOneWithoutRidesNestedInput = {
    create?: XOR<VehicleCreateWithoutRidesInput, VehicleUncheckedCreateWithoutRidesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutRidesInput
    upsert?: VehicleUpsertWithoutRidesInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutRidesInput, VehicleUpdateWithoutRidesInput>, VehicleUncheckedUpdateWithoutRidesInput>
  }

  export type RatingUpdateManyWithoutRideNestedInput = {
    create?: XOR<RatingCreateWithoutRideInput, RatingUncheckedCreateWithoutRideInput> | RatingCreateWithoutRideInput[] | RatingUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutRideInput | RatingCreateOrConnectWithoutRideInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutRideInput | RatingUpsertWithWhereUniqueWithoutRideInput[]
    createMany?: RatingCreateManyRideInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutRideInput | RatingUpdateWithWhereUniqueWithoutRideInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutRideInput | RatingUpdateManyWithWhereWithoutRideInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type PaymentUpdateOneWithoutRideNestedInput = {
    create?: XOR<PaymentCreateWithoutRideInput, PaymentUncheckedCreateWithoutRideInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutRideInput
    upsert?: PaymentUpsertWithoutRideInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutRideInput, PaymentUpdateWithoutRideInput>, PaymentUncheckedUpdateWithoutRideInput>
  }

  export type RideLocationUpdateManyWithoutRideNestedInput = {
    create?: XOR<RideLocationCreateWithoutRideInput, RideLocationUncheckedCreateWithoutRideInput> | RideLocationCreateWithoutRideInput[] | RideLocationUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RideLocationCreateOrConnectWithoutRideInput | RideLocationCreateOrConnectWithoutRideInput[]
    upsert?: RideLocationUpsertWithWhereUniqueWithoutRideInput | RideLocationUpsertWithWhereUniqueWithoutRideInput[]
    createMany?: RideLocationCreateManyRideInputEnvelope
    set?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
    disconnect?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
    delete?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
    connect?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
    update?: RideLocationUpdateWithWhereUniqueWithoutRideInput | RideLocationUpdateWithWhereUniqueWithoutRideInput[]
    updateMany?: RideLocationUpdateManyWithWhereWithoutRideInput | RideLocationUpdateManyWithWhereWithoutRideInput[]
    deleteMany?: RideLocationScalarWhereInput | RideLocationScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutRideNestedInput = {
    create?: XOR<RatingCreateWithoutRideInput, RatingUncheckedCreateWithoutRideInput> | RatingCreateWithoutRideInput[] | RatingUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutRideInput | RatingCreateOrConnectWithoutRideInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutRideInput | RatingUpsertWithWhereUniqueWithoutRideInput[]
    createMany?: RatingCreateManyRideInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutRideInput | RatingUpdateWithWhereUniqueWithoutRideInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutRideInput | RatingUpdateManyWithWhereWithoutRideInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateOneWithoutRideNestedInput = {
    create?: XOR<PaymentCreateWithoutRideInput, PaymentUncheckedCreateWithoutRideInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutRideInput
    upsert?: PaymentUpsertWithoutRideInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutRideInput, PaymentUpdateWithoutRideInput>, PaymentUncheckedUpdateWithoutRideInput>
  }

  export type RideLocationUncheckedUpdateManyWithoutRideNestedInput = {
    create?: XOR<RideLocationCreateWithoutRideInput, RideLocationUncheckedCreateWithoutRideInput> | RideLocationCreateWithoutRideInput[] | RideLocationUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RideLocationCreateOrConnectWithoutRideInput | RideLocationCreateOrConnectWithoutRideInput[]
    upsert?: RideLocationUpsertWithWhereUniqueWithoutRideInput | RideLocationUpsertWithWhereUniqueWithoutRideInput[]
    createMany?: RideLocationCreateManyRideInputEnvelope
    set?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
    disconnect?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
    delete?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
    connect?: RideLocationWhereUniqueInput | RideLocationWhereUniqueInput[]
    update?: RideLocationUpdateWithWhereUniqueWithoutRideInput | RideLocationUpdateWithWhereUniqueWithoutRideInput[]
    updateMany?: RideLocationUpdateManyWithWhereWithoutRideInput | RideLocationUpdateManyWithWhereWithoutRideInput[]
    deleteMany?: RideLocationScalarWhereInput | RideLocationScalarWhereInput[]
  }

  export type RideCreateNestedOneWithoutPaymentInput = {
    create?: XOR<RideCreateWithoutPaymentInput, RideUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: RideCreateOrConnectWithoutPaymentInput
    connect?: RideWhereUniqueInput
  }

  export type RideUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: XOR<RideCreateWithoutPaymentInput, RideUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: RideCreateOrConnectWithoutPaymentInput
    upsert?: RideUpsertWithoutPaymentInput
    connect?: RideWhereUniqueInput
    update?: XOR<XOR<RideUpdateToOneWithWhereWithoutPaymentInput, RideUpdateWithoutPaymentInput>, RideUncheckedUpdateWithoutPaymentInput>
  }

  export type RideCreateNestedOneWithoutRatingsInput = {
    create?: XOR<RideCreateWithoutRatingsInput, RideUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: RideCreateOrConnectWithoutRatingsInput
    connect?: RideWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRatingsInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    connect?: UserWhereUniqueInput
  }

  export type RideUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<RideCreateWithoutRatingsInput, RideUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: RideCreateOrConnectWithoutRatingsInput
    upsert?: RideUpsertWithoutRatingsInput
    connect?: RideWhereUniqueInput
    update?: XOR<XOR<RideUpdateToOneWithWhereWithoutRatingsInput, RideUpdateWithoutRatingsInput>, RideUncheckedUpdateWithoutRatingsInput>
  }

  export type UserUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    upsert?: UserUpsertWithoutRatingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRatingsInput, UserUpdateWithoutRatingsInput>, UserUncheckedUpdateWithoutRatingsInput>
  }

  export type RideCreateNestedOneWithoutLocationsInput = {
    create?: XOR<RideCreateWithoutLocationsInput, RideUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: RideCreateOrConnectWithoutLocationsInput
    connect?: RideWhereUniqueInput
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type RideUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<RideCreateWithoutLocationsInput, RideUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: RideCreateOrConnectWithoutLocationsInput
    upsert?: RideUpsertWithoutLocationsInput
    connect?: RideWhereUniqueInput
    update?: XOR<XOR<RideUpdateToOneWithWhereWithoutLocationsInput, RideUpdateWithoutLocationsInput>, RideUncheckedUpdateWithoutLocationsInput>
  }

  export type DriverCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<DriverCreateWithoutDocumentsInput, DriverUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutDocumentsInput
    connect?: DriverWhereUniqueInput
  }

  export type EnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType
  }

  export type DriverUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<DriverCreateWithoutDocumentsInput, DriverUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutDocumentsInput
    upsert?: DriverUpsertWithoutDocumentsInput
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutDocumentsInput, DriverUpdateWithoutDocumentsInput>, DriverUncheckedUpdateWithoutDocumentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedEnumVehicleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeFilter<$PrismaModel> | $Enums.VehicleType
  }

  export type NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleTypeFilter<$PrismaModel>
    _max?: NestedEnumVehicleTypeFilter<$PrismaModel>
  }

  export type NestedEnumRideStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRideStatusFilter<$PrismaModel> | $Enums.RideStatus
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumRideTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RideType | EnumRideTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RideType[] | ListEnumRideTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideType[] | ListEnumRideTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRideTypeFilter<$PrismaModel> | $Enums.RideType
  }

  export type NestedEnumRideStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRideStatusWithAggregatesFilter<$PrismaModel> | $Enums.RideStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRideStatusFilter<$PrismaModel>
    _max?: NestedEnumRideStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumRideTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideType | EnumRideTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RideType[] | ListEnumRideTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideType[] | ListEnumRideTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRideTypeWithAggregatesFilter<$PrismaModel> | $Enums.RideType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRideTypeFilter<$PrismaModel>
    _max?: NestedEnumRideTypeFilter<$PrismaModel>
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type NestedEnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type DriverCreateWithoutUserInput = {
    id?: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
    rides?: RideCreateNestedManyWithoutDriverInput
    documents?: DriverDocumentCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutUserInput = {
    id?: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverInput
    rides?: RideUncheckedCreateNestedManyWithoutDriverInput
    documents?: DriverDocumentUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutUserInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
  }

  export type PassengerCreateWithoutUserInput = {
    id?: string
    prefersFemaleDriver?: boolean
    totalRides?: number
    averageRating?: number
    specialNeeds?: boolean
    specialNeedsDesc?: string | null
    homeAddress?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    workAddress?: string | null
    workLatitude?: number | null
    workLongitude?: number | null
    rides?: RideCreateNestedManyWithoutPassengerInput
  }

  export type PassengerUncheckedCreateWithoutUserInput = {
    id?: string
    prefersFemaleDriver?: boolean
    totalRides?: number
    averageRating?: number
    specialNeeds?: boolean
    specialNeedsDesc?: string | null
    homeAddress?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    workAddress?: string | null
    workLatitude?: number | null
    workLongitude?: number | null
    rides?: RideUncheckedCreateNestedManyWithoutPassengerInput
  }

  export type PassengerCreateOrConnectWithoutUserInput = {
    where: PassengerWhereUniqueInput
    create: XOR<PassengerCreateWithoutUserInput, PassengerUncheckedCreateWithoutUserInput>
  }

  export type RatingCreateWithoutRatedByInput = {
    id?: string
    ratedUserId: string
    rating: number
    review?: string | null
    cleanliness?: number | null
    drivingSkill?: number | null
    courtesy?: number | null
    createdAt?: Date | string
    ride: RideCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateWithoutRatedByInput = {
    id?: string
    rideId: string
    ratedUserId: string
    rating: number
    review?: string | null
    cleanliness?: number | null
    drivingSkill?: number | null
    courtesy?: number | null
    createdAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutRatedByInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutRatedByInput, RatingUncheckedCreateWithoutRatedByInput>
  }

  export type RatingCreateManyRatedByInputEnvelope = {
    data: RatingCreateManyRatedByInput | RatingCreateManyRatedByInput[]
    skipDuplicates?: boolean
  }

  export type DriverUpsertWithoutUserInput = {
    update: XOR<DriverUpdateWithoutUserInput, DriverUncheckedUpdateWithoutUserInput>
    create: XOR<DriverCreateWithoutUserInput, DriverUncheckedCreateWithoutUserInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutUserInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutUserInput, DriverUncheckedUpdateWithoutUserInput>
  }

  export type DriverUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
    rides?: RideUpdateManyWithoutDriverNestedInput
    documents?: DriverDocumentUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverNestedInput
    rides?: RideUncheckedUpdateManyWithoutDriverNestedInput
    documents?: DriverDocumentUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type PassengerUpsertWithoutUserInput = {
    update: XOR<PassengerUpdateWithoutUserInput, PassengerUncheckedUpdateWithoutUserInput>
    create: XOR<PassengerCreateWithoutUserInput, PassengerUncheckedCreateWithoutUserInput>
    where?: PassengerWhereInput
  }

  export type PassengerUpdateToOneWithWhereWithoutUserInput = {
    where?: PassengerWhereInput
    data: XOR<PassengerUpdateWithoutUserInput, PassengerUncheckedUpdateWithoutUserInput>
  }

  export type PassengerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    prefersFemaleDriver?: BoolFieldUpdateOperationsInput | boolean
    totalRides?: IntFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    specialNeeds?: BoolFieldUpdateOperationsInput | boolean
    specialNeedsDesc?: NullableStringFieldUpdateOperationsInput | string | null
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workAddress?: NullableStringFieldUpdateOperationsInput | string | null
    workLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    rides?: RideUpdateManyWithoutPassengerNestedInput
  }

  export type PassengerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    prefersFemaleDriver?: BoolFieldUpdateOperationsInput | boolean
    totalRides?: IntFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    specialNeeds?: BoolFieldUpdateOperationsInput | boolean
    specialNeedsDesc?: NullableStringFieldUpdateOperationsInput | string | null
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workAddress?: NullableStringFieldUpdateOperationsInput | string | null
    workLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    rides?: RideUncheckedUpdateManyWithoutPassengerNestedInput
  }

  export type RatingUpsertWithWhereUniqueWithoutRatedByInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutRatedByInput, RatingUncheckedUpdateWithoutRatedByInput>
    create: XOR<RatingCreateWithoutRatedByInput, RatingUncheckedCreateWithoutRatedByInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutRatedByInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutRatedByInput, RatingUncheckedUpdateWithoutRatedByInput>
  }

  export type RatingUpdateManyWithWhereWithoutRatedByInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutRatedByInput>
  }

  export type RatingScalarWhereInput = {
    AND?: RatingScalarWhereInput | RatingScalarWhereInput[]
    OR?: RatingScalarWhereInput[]
    NOT?: RatingScalarWhereInput | RatingScalarWhereInput[]
    id?: StringFilter<"Rating"> | string
    rideId?: StringFilter<"Rating"> | string
    ratedByUserId?: StringFilter<"Rating"> | string
    ratedUserId?: StringFilter<"Rating"> | string
    rating?: FloatFilter<"Rating"> | number
    review?: StringNullableFilter<"Rating"> | string | null
    cleanliness?: FloatNullableFilter<"Rating"> | number | null
    drivingSkill?: FloatNullableFilter<"Rating"> | number | null
    courtesy?: FloatNullableFilter<"Rating"> | number | null
    createdAt?: DateTimeFilter<"Rating"> | Date | string
  }

  export type UserCreateWithoutDriverInput = {
    id?: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    address?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clerkId: string
    passenger?: PassengerCreateNestedOneWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutRatedByInput
  }

  export type UserUncheckedCreateWithoutDriverInput = {
    id?: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    address?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clerkId: string
    passenger?: PassengerUncheckedCreateNestedOneWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutRatedByInput
  }

  export type UserCreateOrConnectWithoutDriverInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDriverInput, UserUncheckedCreateWithoutDriverInput>
  }

  export type VehicleCreateWithoutDriverInput = {
    id?: string
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
    registrationExpiryDate: Date | string
    insuranceExpiryDate: Date | string
    vehicleType: $Enums.VehicleType
    capacity: number
    accessibility?: boolean
    carImageUrl?: string | null
    features?: VehicleCreatefeaturesInput | string[]
    inspectionStatus?: $Enums.Status
    inspectionDate?: Date | string | null
    rides?: RideCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutDriverInput = {
    id?: string
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
    registrationExpiryDate: Date | string
    insuranceExpiryDate: Date | string
    vehicleType: $Enums.VehicleType
    capacity: number
    accessibility?: boolean
    carImageUrl?: string | null
    features?: VehicleCreatefeaturesInput | string[]
    inspectionStatus?: $Enums.Status
    inspectionDate?: Date | string | null
    rides?: RideUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutDriverInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
  }

  export type RideCreateWithoutDriverInput = {
    id?: string
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: PassengerCreateNestedOneWithoutRidesInput
    vehicle?: VehicleCreateNestedOneWithoutRidesInput
    ratings?: RatingCreateNestedManyWithoutRideInput
    payment?: PaymentCreateNestedOneWithoutRideInput
    locations?: RideLocationCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateWithoutDriverInput = {
    id?: string
    passengerId: string
    vehicleId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutRideInput
    payment?: PaymentUncheckedCreateNestedOneWithoutRideInput
    locations?: RideLocationUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideCreateOrConnectWithoutDriverInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput>
  }

  export type RideCreateManyDriverInputEnvelope = {
    data: RideCreateManyDriverInput | RideCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type DriverDocumentCreateWithoutDriverInput = {
    id?: string
    documentType: $Enums.DocumentType
    documentNumber?: string | null
    issuedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
    verificationDate?: Date | string | null
    documentUrl: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverDocumentUncheckedCreateWithoutDriverInput = {
    id?: string
    documentType: $Enums.DocumentType
    documentNumber?: string | null
    issuedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
    verificationDate?: Date | string | null
    documentUrl: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverDocumentCreateOrConnectWithoutDriverInput = {
    where: DriverDocumentWhereUniqueInput
    create: XOR<DriverDocumentCreateWithoutDriverInput, DriverDocumentUncheckedCreateWithoutDriverInput>
  }

  export type DriverDocumentCreateManyDriverInputEnvelope = {
    data: DriverDocumentCreateManyDriverInput | DriverDocumentCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDriverInput = {
    update: XOR<UserUpdateWithoutDriverInput, UserUncheckedUpdateWithoutDriverInput>
    create: XOR<UserCreateWithoutDriverInput, UserUncheckedCreateWithoutDriverInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDriverInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDriverInput, UserUncheckedUpdateWithoutDriverInput>
  }

  export type UserUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    passenger?: PassengerUpdateOneWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutRatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    passenger?: PassengerUncheckedUpdateOneWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutRatedByNestedInput
  }

  export type VehicleUpsertWithoutDriverInput = {
    update: XOR<VehicleUpdateWithoutDriverInput, VehicleUncheckedUpdateWithoutDriverInput>
    create: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutDriverInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutDriverInput, VehicleUncheckedUpdateWithoutDriverInput>
  }

  export type VehicleUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    registrationExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleType?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: IntFieldUpdateOperationsInput | number
    accessibility?: BoolFieldUpdateOperationsInput | boolean
    carImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    features?: VehicleUpdatefeaturesInput | string[]
    inspectionStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    inspectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rides?: RideUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    registrationExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleType?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: IntFieldUpdateOperationsInput | number
    accessibility?: BoolFieldUpdateOperationsInput | boolean
    carImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    features?: VehicleUpdatefeaturesInput | string[]
    inspectionStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    inspectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rides?: RideUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type RideUpsertWithWhereUniqueWithoutDriverInput = {
    where: RideWhereUniqueInput
    update: XOR<RideUpdateWithoutDriverInput, RideUncheckedUpdateWithoutDriverInput>
    create: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput>
  }

  export type RideUpdateWithWhereUniqueWithoutDriverInput = {
    where: RideWhereUniqueInput
    data: XOR<RideUpdateWithoutDriverInput, RideUncheckedUpdateWithoutDriverInput>
  }

  export type RideUpdateManyWithWhereWithoutDriverInput = {
    where: RideScalarWhereInput
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyWithoutDriverInput>
  }

  export type RideScalarWhereInput = {
    AND?: RideScalarWhereInput | RideScalarWhereInput[]
    OR?: RideScalarWhereInput[]
    NOT?: RideScalarWhereInput | RideScalarWhereInput[]
    id?: StringFilter<"Ride"> | string
    passengerId?: StringFilter<"Ride"> | string
    driverId?: StringNullableFilter<"Ride"> | string | null
    vehicleId?: StringNullableFilter<"Ride"> | string | null
    status?: EnumRideStatusFilter<"Ride"> | $Enums.RideStatus
    requestTime?: DateTimeFilter<"Ride"> | Date | string
    acceptTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    pickupTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    dropOffTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    originAddress?: StringFilter<"Ride"> | string
    originLatitude?: FloatFilter<"Ride"> | number
    originLongitude?: FloatFilter<"Ride"> | number
    destinationAddress?: StringFilter<"Ride"> | string
    destinationLatitude?: FloatFilter<"Ride"> | number
    destinationLongitude?: FloatFilter<"Ride"> | number
    estimatedDuration?: IntFilter<"Ride"> | number
    actualDuration?: IntNullableFilter<"Ride"> | number | null
    estimatedDistance?: FloatFilter<"Ride"> | number
    actualDistance?: FloatNullableFilter<"Ride"> | number | null
    basePrice?: FloatFilter<"Ride"> | number
    finalPrice?: FloatNullableFilter<"Ride"> | number | null
    currency?: StringFilter<"Ride"> | string
    paymentStatus?: EnumPaymentStatusFilter<"Ride"> | $Enums.PaymentStatus
    paymentMethodId?: StringNullableFilter<"Ride"> | string | null
    cancellationReason?: StringNullableFilter<"Ride"> | string | null
    cancellationTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    cancellationFee?: FloatNullableFilter<"Ride"> | number | null
    isFemaleOnlyRide?: BoolFilter<"Ride"> | boolean
    specialRequirements?: StringNullableFilter<"Ride"> | string | null
    baggageQuantity?: IntFilter<"Ride"> | number
    rideType?: EnumRideTypeFilter<"Ride"> | $Enums.RideType
    scheduledTime?: DateTimeNullableFilter<"Ride"> | Date | string | null
    createdAt?: DateTimeFilter<"Ride"> | Date | string
    updatedAt?: DateTimeFilter<"Ride"> | Date | string
  }

  export type DriverDocumentUpsertWithWhereUniqueWithoutDriverInput = {
    where: DriverDocumentWhereUniqueInput
    update: XOR<DriverDocumentUpdateWithoutDriverInput, DriverDocumentUncheckedUpdateWithoutDriverInput>
    create: XOR<DriverDocumentCreateWithoutDriverInput, DriverDocumentUncheckedCreateWithoutDriverInput>
  }

  export type DriverDocumentUpdateWithWhereUniqueWithoutDriverInput = {
    where: DriverDocumentWhereUniqueInput
    data: XOR<DriverDocumentUpdateWithoutDriverInput, DriverDocumentUncheckedUpdateWithoutDriverInput>
  }

  export type DriverDocumentUpdateManyWithWhereWithoutDriverInput = {
    where: DriverDocumentScalarWhereInput
    data: XOR<DriverDocumentUpdateManyMutationInput, DriverDocumentUncheckedUpdateManyWithoutDriverInput>
  }

  export type DriverDocumentScalarWhereInput = {
    AND?: DriverDocumentScalarWhereInput | DriverDocumentScalarWhereInput[]
    OR?: DriverDocumentScalarWhereInput[]
    NOT?: DriverDocumentScalarWhereInput | DriverDocumentScalarWhereInput[]
    id?: StringFilter<"DriverDocument"> | string
    driverId?: StringFilter<"DriverDocument"> | string
    documentType?: EnumDocumentTypeFilter<"DriverDocument"> | $Enums.DocumentType
    documentNumber?: StringNullableFilter<"DriverDocument"> | string | null
    issuedDate?: DateTimeNullableFilter<"DriverDocument"> | Date | string | null
    expiryDate?: DateTimeNullableFilter<"DriverDocument"> | Date | string | null
    isVerified?: BoolFilter<"DriverDocument"> | boolean
    verificationDate?: DateTimeNullableFilter<"DriverDocument"> | Date | string | null
    documentUrl?: StringFilter<"DriverDocument"> | string
    notes?: StringNullableFilter<"DriverDocument"> | string | null
    createdAt?: DateTimeFilter<"DriverDocument"> | Date | string
    updatedAt?: DateTimeFilter<"DriverDocument"> | Date | string
  }

  export type UserCreateWithoutPassengerInput = {
    id?: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    address?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clerkId: string
    driver?: DriverCreateNestedOneWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutRatedByInput
  }

  export type UserUncheckedCreateWithoutPassengerInput = {
    id?: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    address?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clerkId: string
    driver?: DriverUncheckedCreateNestedOneWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutRatedByInput
  }

  export type UserCreateOrConnectWithoutPassengerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPassengerInput, UserUncheckedCreateWithoutPassengerInput>
  }

  export type RideCreateWithoutPassengerInput = {
    id?: string
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driver?: DriverCreateNestedOneWithoutRidesInput
    vehicle?: VehicleCreateNestedOneWithoutRidesInput
    ratings?: RatingCreateNestedManyWithoutRideInput
    payment?: PaymentCreateNestedOneWithoutRideInput
    locations?: RideLocationCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateWithoutPassengerInput = {
    id?: string
    driverId?: string | null
    vehicleId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutRideInput
    payment?: PaymentUncheckedCreateNestedOneWithoutRideInput
    locations?: RideLocationUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideCreateOrConnectWithoutPassengerInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutPassengerInput, RideUncheckedCreateWithoutPassengerInput>
  }

  export type RideCreateManyPassengerInputEnvelope = {
    data: RideCreateManyPassengerInput | RideCreateManyPassengerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPassengerInput = {
    update: XOR<UserUpdateWithoutPassengerInput, UserUncheckedUpdateWithoutPassengerInput>
    create: XOR<UserCreateWithoutPassengerInput, UserUncheckedCreateWithoutPassengerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPassengerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPassengerInput, UserUncheckedUpdateWithoutPassengerInput>
  }

  export type UserUpdateWithoutPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    driver?: DriverUpdateOneWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutRatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    driver?: DriverUncheckedUpdateOneWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutRatedByNestedInput
  }

  export type RideUpsertWithWhereUniqueWithoutPassengerInput = {
    where: RideWhereUniqueInput
    update: XOR<RideUpdateWithoutPassengerInput, RideUncheckedUpdateWithoutPassengerInput>
    create: XOR<RideCreateWithoutPassengerInput, RideUncheckedCreateWithoutPassengerInput>
  }

  export type RideUpdateWithWhereUniqueWithoutPassengerInput = {
    where: RideWhereUniqueInput
    data: XOR<RideUpdateWithoutPassengerInput, RideUncheckedUpdateWithoutPassengerInput>
  }

  export type RideUpdateManyWithWhereWithoutPassengerInput = {
    where: RideScalarWhereInput
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyWithoutPassengerInput>
  }

  export type DriverCreateWithoutVehicleInput = {
    id?: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    user: UserCreateNestedOneWithoutDriverInput
    rides?: RideCreateNestedManyWithoutDriverInput
    documents?: DriverDocumentCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutVehicleInput = {
    id?: string
    userId: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    rides?: RideUncheckedCreateNestedManyWithoutDriverInput
    documents?: DriverDocumentUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutVehicleInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
  }

  export type RideCreateWithoutVehicleInput = {
    id?: string
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: PassengerCreateNestedOneWithoutRidesInput
    driver?: DriverCreateNestedOneWithoutRidesInput
    ratings?: RatingCreateNestedManyWithoutRideInput
    payment?: PaymentCreateNestedOneWithoutRideInput
    locations?: RideLocationCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateWithoutVehicleInput = {
    id?: string
    passengerId: string
    driverId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutRideInput
    payment?: PaymentUncheckedCreateNestedOneWithoutRideInput
    locations?: RideLocationUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideCreateOrConnectWithoutVehicleInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutVehicleInput, RideUncheckedCreateWithoutVehicleInput>
  }

  export type RideCreateManyVehicleInputEnvelope = {
    data: RideCreateManyVehicleInput | RideCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type DriverUpsertWithoutVehicleInput = {
    update: XOR<DriverUpdateWithoutVehicleInput, DriverUncheckedUpdateWithoutVehicleInput>
    create: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutVehicleInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutVehicleInput, DriverUncheckedUpdateWithoutVehicleInput>
  }

  export type DriverUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDriverNestedInput
    rides?: RideUpdateManyWithoutDriverNestedInput
    documents?: DriverDocumentUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    rides?: RideUncheckedUpdateManyWithoutDriverNestedInput
    documents?: DriverDocumentUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type RideUpsertWithWhereUniqueWithoutVehicleInput = {
    where: RideWhereUniqueInput
    update: XOR<RideUpdateWithoutVehicleInput, RideUncheckedUpdateWithoutVehicleInput>
    create: XOR<RideCreateWithoutVehicleInput, RideUncheckedCreateWithoutVehicleInput>
  }

  export type RideUpdateWithWhereUniqueWithoutVehicleInput = {
    where: RideWhereUniqueInput
    data: XOR<RideUpdateWithoutVehicleInput, RideUncheckedUpdateWithoutVehicleInput>
  }

  export type RideUpdateManyWithWhereWithoutVehicleInput = {
    where: RideScalarWhereInput
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyWithoutVehicleInput>
  }

  export type PassengerCreateWithoutRidesInput = {
    id?: string
    prefersFemaleDriver?: boolean
    totalRides?: number
    averageRating?: number
    specialNeeds?: boolean
    specialNeedsDesc?: string | null
    homeAddress?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    workAddress?: string | null
    workLatitude?: number | null
    workLongitude?: number | null
    user: UserCreateNestedOneWithoutPassengerInput
  }

  export type PassengerUncheckedCreateWithoutRidesInput = {
    id?: string
    userId: string
    prefersFemaleDriver?: boolean
    totalRides?: number
    averageRating?: number
    specialNeeds?: boolean
    specialNeedsDesc?: string | null
    homeAddress?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    workAddress?: string | null
    workLatitude?: number | null
    workLongitude?: number | null
  }

  export type PassengerCreateOrConnectWithoutRidesInput = {
    where: PassengerWhereUniqueInput
    create: XOR<PassengerCreateWithoutRidesInput, PassengerUncheckedCreateWithoutRidesInput>
  }

  export type DriverCreateWithoutRidesInput = {
    id?: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    user: UserCreateNestedOneWithoutDriverInput
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
    documents?: DriverDocumentCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutRidesInput = {
    id?: string
    userId: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverInput
    documents?: DriverDocumentUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutRidesInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutRidesInput, DriverUncheckedCreateWithoutRidesInput>
  }

  export type VehicleCreateWithoutRidesInput = {
    id?: string
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
    registrationExpiryDate: Date | string
    insuranceExpiryDate: Date | string
    vehicleType: $Enums.VehicleType
    capacity: number
    accessibility?: boolean
    carImageUrl?: string | null
    features?: VehicleCreatefeaturesInput | string[]
    inspectionStatus?: $Enums.Status
    inspectionDate?: Date | string | null
    driver: DriverCreateNestedOneWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutRidesInput = {
    id?: string
    driverId: string
    make: string
    model: string
    year: number
    color: string
    licensePlate: string
    registrationExpiryDate: Date | string
    insuranceExpiryDate: Date | string
    vehicleType: $Enums.VehicleType
    capacity: number
    accessibility?: boolean
    carImageUrl?: string | null
    features?: VehicleCreatefeaturesInput | string[]
    inspectionStatus?: $Enums.Status
    inspectionDate?: Date | string | null
  }

  export type VehicleCreateOrConnectWithoutRidesInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutRidesInput, VehicleUncheckedCreateWithoutRidesInput>
  }

  export type RatingCreateWithoutRideInput = {
    id?: string
    ratedUserId: string
    rating: number
    review?: string | null
    cleanliness?: number | null
    drivingSkill?: number | null
    courtesy?: number | null
    createdAt?: Date | string
    ratedBy: UserCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateWithoutRideInput = {
    id?: string
    ratedByUserId: string
    ratedUserId: string
    rating: number
    review?: string | null
    cleanliness?: number | null
    drivingSkill?: number | null
    courtesy?: number | null
    createdAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutRideInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutRideInput, RatingUncheckedCreateWithoutRideInput>
  }

  export type RatingCreateManyRideInputEnvelope = {
    data: RatingCreateManyRideInput | RatingCreateManyRideInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutRideInput = {
    id?: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod: string
    paymentIntentId?: string | null
    stripeCustomerId?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutRideInput = {
    id?: string
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    paymentMethod: string
    paymentIntentId?: string | null
    stripeCustomerId?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutRideInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutRideInput, PaymentUncheckedCreateWithoutRideInput>
  }

  export type RideLocationCreateWithoutRideInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
    speed?: number | null
    bearing?: number | null
    accuracy?: number | null
    userType: $Enums.UserType
  }

  export type RideLocationUncheckedCreateWithoutRideInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
    speed?: number | null
    bearing?: number | null
    accuracy?: number | null
    userType: $Enums.UserType
  }

  export type RideLocationCreateOrConnectWithoutRideInput = {
    where: RideLocationWhereUniqueInput
    create: XOR<RideLocationCreateWithoutRideInput, RideLocationUncheckedCreateWithoutRideInput>
  }

  export type RideLocationCreateManyRideInputEnvelope = {
    data: RideLocationCreateManyRideInput | RideLocationCreateManyRideInput[]
    skipDuplicates?: boolean
  }

  export type PassengerUpsertWithoutRidesInput = {
    update: XOR<PassengerUpdateWithoutRidesInput, PassengerUncheckedUpdateWithoutRidesInput>
    create: XOR<PassengerCreateWithoutRidesInput, PassengerUncheckedCreateWithoutRidesInput>
    where?: PassengerWhereInput
  }

  export type PassengerUpdateToOneWithWhereWithoutRidesInput = {
    where?: PassengerWhereInput
    data: XOR<PassengerUpdateWithoutRidesInput, PassengerUncheckedUpdateWithoutRidesInput>
  }

  export type PassengerUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    prefersFemaleDriver?: BoolFieldUpdateOperationsInput | boolean
    totalRides?: IntFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    specialNeeds?: BoolFieldUpdateOperationsInput | boolean
    specialNeedsDesc?: NullableStringFieldUpdateOperationsInput | string | null
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workAddress?: NullableStringFieldUpdateOperationsInput | string | null
    workLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutPassengerNestedInput
  }

  export type PassengerUncheckedUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prefersFemaleDriver?: BoolFieldUpdateOperationsInput | boolean
    totalRides?: IntFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    specialNeeds?: BoolFieldUpdateOperationsInput | boolean
    specialNeedsDesc?: NullableStringFieldUpdateOperationsInput | string | null
    homeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workAddress?: NullableStringFieldUpdateOperationsInput | string | null
    workLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    workLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type DriverUpsertWithoutRidesInput = {
    update: XOR<DriverUpdateWithoutRidesInput, DriverUncheckedUpdateWithoutRidesInput>
    create: XOR<DriverCreateWithoutRidesInput, DriverUncheckedCreateWithoutRidesInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutRidesInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutRidesInput, DriverUncheckedUpdateWithoutRidesInput>
  }

  export type DriverUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDriverNestedInput
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
    documents?: DriverDocumentUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverNestedInput
    documents?: DriverDocumentUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type VehicleUpsertWithoutRidesInput = {
    update: XOR<VehicleUpdateWithoutRidesInput, VehicleUncheckedUpdateWithoutRidesInput>
    create: XOR<VehicleCreateWithoutRidesInput, VehicleUncheckedCreateWithoutRidesInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutRidesInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutRidesInput, VehicleUncheckedUpdateWithoutRidesInput>
  }

  export type VehicleUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    registrationExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleType?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: IntFieldUpdateOperationsInput | number
    accessibility?: BoolFieldUpdateOperationsInput | boolean
    carImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    features?: VehicleUpdatefeaturesInput | string[]
    inspectionStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    inspectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver?: DriverUpdateOneRequiredWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    registrationExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleType?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: IntFieldUpdateOperationsInput | number
    accessibility?: BoolFieldUpdateOperationsInput | boolean
    carImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    features?: VehicleUpdatefeaturesInput | string[]
    inspectionStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    inspectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RatingUpsertWithWhereUniqueWithoutRideInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutRideInput, RatingUncheckedUpdateWithoutRideInput>
    create: XOR<RatingCreateWithoutRideInput, RatingUncheckedCreateWithoutRideInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutRideInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutRideInput, RatingUncheckedUpdateWithoutRideInput>
  }

  export type RatingUpdateManyWithWhereWithoutRideInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutRideInput>
  }

  export type PaymentUpsertWithoutRideInput = {
    update: XOR<PaymentUpdateWithoutRideInput, PaymentUncheckedUpdateWithoutRideInput>
    create: XOR<PaymentCreateWithoutRideInput, PaymentUncheckedCreateWithoutRideInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutRideInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutRideInput, PaymentUncheckedUpdateWithoutRideInput>
  }

  export type PaymentUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideLocationUpsertWithWhereUniqueWithoutRideInput = {
    where: RideLocationWhereUniqueInput
    update: XOR<RideLocationUpdateWithoutRideInput, RideLocationUncheckedUpdateWithoutRideInput>
    create: XOR<RideLocationCreateWithoutRideInput, RideLocationUncheckedCreateWithoutRideInput>
  }

  export type RideLocationUpdateWithWhereUniqueWithoutRideInput = {
    where: RideLocationWhereUniqueInput
    data: XOR<RideLocationUpdateWithoutRideInput, RideLocationUncheckedUpdateWithoutRideInput>
  }

  export type RideLocationUpdateManyWithWhereWithoutRideInput = {
    where: RideLocationScalarWhereInput
    data: XOR<RideLocationUpdateManyMutationInput, RideLocationUncheckedUpdateManyWithoutRideInput>
  }

  export type RideLocationScalarWhereInput = {
    AND?: RideLocationScalarWhereInput | RideLocationScalarWhereInput[]
    OR?: RideLocationScalarWhereInput[]
    NOT?: RideLocationScalarWhereInput | RideLocationScalarWhereInput[]
    id?: StringFilter<"RideLocation"> | string
    rideId?: StringFilter<"RideLocation"> | string
    latitude?: FloatFilter<"RideLocation"> | number
    longitude?: FloatFilter<"RideLocation"> | number
    timestamp?: DateTimeFilter<"RideLocation"> | Date | string
    speed?: FloatNullableFilter<"RideLocation"> | number | null
    bearing?: FloatNullableFilter<"RideLocation"> | number | null
    accuracy?: FloatNullableFilter<"RideLocation"> | number | null
    userType?: EnumUserTypeFilter<"RideLocation"> | $Enums.UserType
  }

  export type RideCreateWithoutPaymentInput = {
    id?: string
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: PassengerCreateNestedOneWithoutRidesInput
    driver?: DriverCreateNestedOneWithoutRidesInput
    vehicle?: VehicleCreateNestedOneWithoutRidesInput
    ratings?: RatingCreateNestedManyWithoutRideInput
    locations?: RideLocationCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateWithoutPaymentInput = {
    id?: string
    passengerId: string
    driverId?: string | null
    vehicleId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutRideInput
    locations?: RideLocationUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideCreateOrConnectWithoutPaymentInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutPaymentInput, RideUncheckedCreateWithoutPaymentInput>
  }

  export type RideUpsertWithoutPaymentInput = {
    update: XOR<RideUpdateWithoutPaymentInput, RideUncheckedUpdateWithoutPaymentInput>
    create: XOR<RideCreateWithoutPaymentInput, RideUncheckedCreateWithoutPaymentInput>
    where?: RideWhereInput
  }

  export type RideUpdateToOneWithWhereWithoutPaymentInput = {
    where?: RideWhereInput
    data: XOR<RideUpdateWithoutPaymentInput, RideUncheckedUpdateWithoutPaymentInput>
  }

  export type RideUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: PassengerUpdateOneRequiredWithoutRidesNestedInput
    driver?: DriverUpdateOneWithoutRidesNestedInput
    vehicle?: VehicleUpdateOneWithoutRidesNestedInput
    ratings?: RatingUpdateManyWithoutRideNestedInput
    locations?: RideLocationUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutRideNestedInput
    locations?: RideLocationUncheckedUpdateManyWithoutRideNestedInput
  }

  export type RideCreateWithoutRatingsInput = {
    id?: string
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: PassengerCreateNestedOneWithoutRidesInput
    driver?: DriverCreateNestedOneWithoutRidesInput
    vehicle?: VehicleCreateNestedOneWithoutRidesInput
    payment?: PaymentCreateNestedOneWithoutRideInput
    locations?: RideLocationCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateWithoutRatingsInput = {
    id?: string
    passengerId: string
    driverId?: string | null
    vehicleId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutRideInput
    locations?: RideLocationUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideCreateOrConnectWithoutRatingsInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutRatingsInput, RideUncheckedCreateWithoutRatingsInput>
  }

  export type UserCreateWithoutRatingsInput = {
    id?: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    address?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clerkId: string
    driver?: DriverCreateNestedOneWithoutUserInput
    passenger?: PassengerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRatingsInput = {
    id?: string
    email: string
    phone: string
    firstName: string
    lastName: string
    gender: $Enums.Gender
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    address?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clerkId: string
    driver?: DriverUncheckedCreateNestedOneWithoutUserInput
    passenger?: PassengerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRatingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
  }

  export type RideUpsertWithoutRatingsInput = {
    update: XOR<RideUpdateWithoutRatingsInput, RideUncheckedUpdateWithoutRatingsInput>
    create: XOR<RideCreateWithoutRatingsInput, RideUncheckedCreateWithoutRatingsInput>
    where?: RideWhereInput
  }

  export type RideUpdateToOneWithWhereWithoutRatingsInput = {
    where?: RideWhereInput
    data: XOR<RideUpdateWithoutRatingsInput, RideUncheckedUpdateWithoutRatingsInput>
  }

  export type RideUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: PassengerUpdateOneRequiredWithoutRidesNestedInput
    driver?: DriverUpdateOneWithoutRidesNestedInput
    vehicle?: VehicleUpdateOneWithoutRidesNestedInput
    payment?: PaymentUpdateOneWithoutRideNestedInput
    locations?: RideLocationUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutRideNestedInput
    locations?: RideLocationUncheckedUpdateManyWithoutRideNestedInput
  }

  export type UserUpsertWithoutRatingsInput = {
    update: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRatingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
  }

  export type UserUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    driver?: DriverUpdateOneWithoutUserNestedInput
    passenger?: PassengerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    driver?: DriverUncheckedUpdateOneWithoutUserNestedInput
    passenger?: PassengerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type RideCreateWithoutLocationsInput = {
    id?: string
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passenger: PassengerCreateNestedOneWithoutRidesInput
    driver?: DriverCreateNestedOneWithoutRidesInput
    vehicle?: VehicleCreateNestedOneWithoutRidesInput
    ratings?: RatingCreateNestedManyWithoutRideInput
    payment?: PaymentCreateNestedOneWithoutRideInput
  }

  export type RideUncheckedCreateWithoutLocationsInput = {
    id?: string
    passengerId: string
    driverId?: string | null
    vehicleId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ratings?: RatingUncheckedCreateNestedManyWithoutRideInput
    payment?: PaymentUncheckedCreateNestedOneWithoutRideInput
  }

  export type RideCreateOrConnectWithoutLocationsInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutLocationsInput, RideUncheckedCreateWithoutLocationsInput>
  }

  export type RideUpsertWithoutLocationsInput = {
    update: XOR<RideUpdateWithoutLocationsInput, RideUncheckedUpdateWithoutLocationsInput>
    create: XOR<RideCreateWithoutLocationsInput, RideUncheckedCreateWithoutLocationsInput>
    where?: RideWhereInput
  }

  export type RideUpdateToOneWithWhereWithoutLocationsInput = {
    where?: RideWhereInput
    data: XOR<RideUpdateWithoutLocationsInput, RideUncheckedUpdateWithoutLocationsInput>
  }

  export type RideUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: PassengerUpdateOneRequiredWithoutRidesNestedInput
    driver?: DriverUpdateOneWithoutRidesNestedInput
    vehicle?: VehicleUpdateOneWithoutRidesNestedInput
    ratings?: RatingUpdateManyWithoutRideNestedInput
    payment?: PaymentUpdateOneWithoutRideNestedInput
  }

  export type RideUncheckedUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutRideNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutRideNestedInput
  }

  export type DriverCreateWithoutDocumentsInput = {
    id?: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    user: UserCreateNestedOneWithoutDriverInput
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
    rides?: RideCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateWithoutDocumentsInput = {
    id?: string
    userId: string
    licenseNumber: string
    licenseExpiryDate: Date | string
    isAvailable?: boolean
    currentLatitude?: number | null
    currentLongitude?: number | null
    averageRating?: number
    totalRides?: number
    accountStatus?: $Enums.Status
    backgroundCheckStatus?: $Enums.Status
    backgroundCheckDate?: Date | string | null
    isOnline?: boolean
    acceptsFemaleOnly?: boolean
    bankAccount?: string | null
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverInput
    rides?: RideUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverCreateOrConnectWithoutDocumentsInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutDocumentsInput, DriverUncheckedCreateWithoutDocumentsInput>
  }

  export type DriverUpsertWithoutDocumentsInput = {
    update: XOR<DriverUpdateWithoutDocumentsInput, DriverUncheckedUpdateWithoutDocumentsInput>
    create: XOR<DriverCreateWithoutDocumentsInput, DriverUncheckedCreateWithoutDocumentsInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutDocumentsInput, DriverUncheckedUpdateWithoutDocumentsInput>
  }

  export type DriverUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDriverNestedInput
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
    rides?: RideUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalRides?: IntFieldUpdateOperationsInput | number
    accountStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    backgroundCheckDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    acceptsFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    bankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverNestedInput
    rides?: RideUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type RatingCreateManyRatedByInput = {
    id?: string
    rideId: string
    ratedUserId: string
    rating: number
    review?: string | null
    cleanliness?: number | null
    drivingSkill?: number | null
    courtesy?: number | null
    createdAt?: Date | string
  }

  export type RatingUpdateWithoutRatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ride?: RideUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateWithoutRatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutRatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideCreateManyDriverInput = {
    id?: string
    passengerId: string
    vehicleId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverDocumentCreateManyDriverInput = {
    id?: string
    documentType: $Enums.DocumentType
    documentNumber?: string | null
    issuedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
    verificationDate?: Date | string | null
    documentUrl: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: PassengerUpdateOneRequiredWithoutRidesNestedInput
    vehicle?: VehicleUpdateOneWithoutRidesNestedInput
    ratings?: RatingUpdateManyWithoutRideNestedInput
    payment?: PaymentUpdateOneWithoutRideNestedInput
    locations?: RideLocationUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutRideNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutRideNestedInput
    locations?: RideLocationUncheckedUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverDocumentUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverDocumentUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverDocumentUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideCreateManyPassengerInput = {
    id?: string
    driverId?: string | null
    vehicleId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideUpdateWithoutPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneWithoutRidesNestedInput
    vehicle?: VehicleUpdateOneWithoutRidesNestedInput
    ratings?: RatingUpdateManyWithoutRideNestedInput
    payment?: PaymentUpdateOneWithoutRideNestedInput
    locations?: RideLocationUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateWithoutPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutRideNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutRideNestedInput
    locations?: RideLocationUncheckedUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateManyWithoutPassengerInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideCreateManyVehicleInput = {
    id?: string
    passengerId: string
    driverId?: string | null
    status?: $Enums.RideStatus
    requestTime?: Date | string
    acceptTime?: Date | string | null
    pickupTime?: Date | string | null
    dropOffTime?: Date | string | null
    originAddress: string
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: number
    destinationLongitude: number
    estimatedDuration: number
    actualDuration?: number | null
    estimatedDistance: number
    actualDistance?: number | null
    basePrice: number
    finalPrice?: number | null
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paymentMethodId?: string | null
    cancellationReason?: string | null
    cancellationTime?: Date | string | null
    cancellationFee?: number | null
    isFemaleOnlyRide?: boolean
    specialRequirements?: string | null
    baggageQuantity?: number
    rideType?: $Enums.RideType
    scheduledTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passenger?: PassengerUpdateOneRequiredWithoutRidesNestedInput
    driver?: DriverUpdateOneWithoutRidesNestedInput
    ratings?: RatingUpdateManyWithoutRideNestedInput
    payment?: PaymentUpdateOneWithoutRideNestedInput
    locations?: RideLocationUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratings?: RatingUncheckedUpdateManyWithoutRideNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutRideNestedInput
    locations?: RideLocationUncheckedUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    passengerId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    requestTime?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickupTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dropOffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originAddress?: StringFieldUpdateOperationsInput | string
    originLatitude?: FloatFieldUpdateOperationsInput | number
    originLongitude?: FloatFieldUpdateOperationsInput | number
    destinationAddress?: StringFieldUpdateOperationsInput | string
    destinationLatitude?: FloatFieldUpdateOperationsInput | number
    destinationLongitude?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: IntFieldUpdateOperationsInput | number
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDistance?: FloatFieldUpdateOperationsInput | number
    actualDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    finalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethodId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    isFemaleOnlyRide?: BoolFieldUpdateOperationsInput | boolean
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    baggageQuantity?: IntFieldUpdateOperationsInput | number
    rideType?: EnumRideTypeFieldUpdateOperationsInput | $Enums.RideType
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateManyRideInput = {
    id?: string
    ratedByUserId: string
    ratedUserId: string
    rating: number
    review?: string | null
    cleanliness?: number | null
    drivingSkill?: number | null
    courtesy?: number | null
    createdAt?: Date | string
  }

  export type RideLocationCreateManyRideInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
    speed?: number | null
    bearing?: number | null
    accuracy?: number | null
    userType: $Enums.UserType
  }

  export type RatingUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratedBy?: UserUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    ratedByUserId?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    ratedByUserId?: StringFieldUpdateOperationsInput | string
    ratedUserId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    cleanliness?: NullableFloatFieldUpdateOperationsInput | number | null
    drivingSkill?: NullableFloatFieldUpdateOperationsInput | number | null
    courtesy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideLocationUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    bearing?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type RideLocationUncheckedUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    bearing?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type RideLocationUncheckedUpdateManyWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    bearing?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}