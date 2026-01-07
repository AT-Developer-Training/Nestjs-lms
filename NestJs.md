# Complete NestJS Learning Guide

## Table of Contents
1. [Introduction to NestJS](#1-introduction-to-nestjs)
2. [Installation and Setup](#2-installation-and-setup)
3. [Core Concepts](#3-core-concepts)
4. [Dependency Injection](#4-dependency-injection)
5. [Security with bcrypt](#5-security-with-bcrypt)
6. [Request Handling](#6-request-handling)
7. [Advanced Concepts](#7-advanced-concepts)
8. [Validation and DTOs](#8-validation-and-dtos)
9. [Class Transformer](#9-class-transformer)
10. [Mapped Types](#10-mapped-types)

---

## 1. Introduction to NestJS

### What is NestJS?

NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It is built with TypeScript and uses modern JavaScript, combining elements of Object-Oriented Programming (OOP), Functional Programming (FP), and Functional Reactive Programming (FRP).

**Key Features:**
- Built on top of Express.js (or Fastify)
- TypeScript support out of the box
- Modular architecture
- Dependency Injection system
- Built-in support for WebSockets, GraphQL, and microservices
- Extensive ecosystem

### Why do we need NestJS when we already have Express.js and Node.js?

While Express.js and Node.js are powerful, NestJS provides several advantages:

1. **Structure and Organization**: NestJS enforces a modular architecture, making large applications easier to maintain and scale.

2. **TypeScript First**: Full TypeScript support with type safety, reducing runtime errors.

3. **Dependency Injection**: Built-in DI container makes code more testable and maintainable.

4. **Decorators**: Uses decorators to reduce boilerplate code and make code more declarative.

5. **Built-in Features**: Includes many features out of the box (validation, guards, interceptors, pipes) that require additional setup in Express.

6. **Enterprise Ready**: Designed for large-scale applications with clear patterns and conventions.

7. **Testing**: Easier to write unit tests and integration tests with the DI system.

### How NestJS Works

NestJS follows a modular architecture where:
- **Modules** organize code into features
- **Controllers** handle HTTP requests
- **Services** contain business logic
- **Providers** can be injected as dependencies
- **Decorators** add metadata to classes and methods

The framework uses decorators extensively to define routes, inject dependencies, and configure behavior.

### What is the Flow of NestJS?

```
Request → Middleware → Guards → Interceptors (before) → Pipes → Controller → Service → Database
                                                                                    ↓
Response ← Interceptors (after) ← Exception Filters ← Controller ← Service ← Database
```

### What is the Request Cycle of NestJS?

The request cycle in NestJS follows this sequence:

1. **Middleware** - Executes before route handlers (e.g., CORS, body parsing)
2. **Guards** - Determines if the request should be handled by the route handler
3. **Interceptors (Before)** - Executes before the route handler
4. **Pipes** - Transforms and validates input data
5. **Controller Handler** - Processes the request
6. **Service Methods** - Business logic execution
7. **Interceptors (After)** - Executes after the route handler
8. **Exception Filters** - Handles exceptions if any occur
9. **Response** - Sent back to the client

---

## 2. Installation and Setup

### How to Install NestJS and How to Set it Up?

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

#### Installation

**Option 1: Using Nest CLI (Recommended)**

```bash
# Install Nest CLI globally
npm i -g @nestjs/cli

# Create a new NestJS project
nest new project-name

# Navigate to the project
cd project-name

# Start the development server
npm run start:dev
```

#### Project Structure

After installation, your project structure will look like:

```
src/
├── app.controller.ts      # Basic controller
├── app.service.ts         # Basic service
├── app.module.ts          # Root module
└── main.ts                # Application entry point
```

#### main.ts - Application Entry Point

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

---

## 3. Core Concepts

### What are Decorators and Why and How to Use Them?

**Decorators** are special functions that add metadata to classes, methods, properties, or parameters. They are prefixed with `@` symbol and are a TypeScript feature that NestJS uses extensively.

**What Decorators Do:**
- **Add Metadata**: Attach information to classes, methods, or parameters
- **Modify Behavior**: Change how classes or methods behave at runtime
- **Enable Reflection**: Allow NestJS to inspect and use metadata
- **Declarative Programming**: Express intent clearly without boilerplate

**How Decorators Work:**
1. Decorators are functions that receive the target (class, method, property, or parameter)
2. They can modify or add metadata to the target
3. NestJS reads this metadata at runtime to configure behavior
4. They execute when the class is defined, not when instantiated

**Why Use Decorators?**
- **Less Boilerplate**: Eliminate repetitive code
- **Declarative**: Express what you want, not how to do it
- **Type Safety**: TypeScript ensures correct usage
- **Framework Integration**: Seamless integration with NestJS features
- **Readability**: Code is self-documenting

**Types of Decorators:**

**1. Class Decorators** - Applied to classes:
```typescript
@Controller('users')        // Marks class as a controller with route prefix
@Injectable()              // Marks class as injectable (for DI)
@Module({})                // Marks class as a module
```

**2. Method Decorators** - Applied to methods:
```typescript
@Get()                     // HTTP GET method handler
@Post()                    // HTTP POST method handler
@Put()                     // HTTP PUT method handler
@Delete()                  // HTTP DELETE method handler
@UseGuards(AuthGuard)      // Apply guards to method
@UsePipes(ValidationPipe) // Apply pipes to method
```

**3. Parameter Decorators** - Applied to method parameters:
```typescript
@Body()                    // Extract request body
@Param('id')               // Extract route parameter
@Query('page')             // Extract query parameter
@Headers('authorization')  // Extract header value
```

**Example:**

```typescript
@Controller('users')  // Class decorator: defines base route
export class UsersController {
  @Get()              // Method decorator: handles GET requests
  findAll() {
    return 'This action returns all users';
  }

  @Get(':id')         // Method decorator: handles GET with parameter
  findOne(@Param('id') id: string) {  // Parameter decorator: extracts 'id' from route
    return `This action returns user #${id}`;
  }
}
```

**Common Decorators in NestJS:**

```typescript
// Class decorators
@Controller('route')        // Define controller with route prefix
@Injectable()                // Make class injectable
@Module({})                 // Define module
@Catch(Exception)           // Exception filter

// Method decorators
@Get(), @Post(), @Put(), @Patch(), @Delete()  // HTTP methods
@UseGuards(Guard)           // Apply guards
@UsePipes(Pipe)             // Apply pipes
@UseFilters(Filter)          // Apply filters
@UseInterceptors(Interceptor) // Apply interceptors

// Parameter decorators
@Body()                     // Request body
@Param('name')              // Route parameter
@Query('key')               // Query parameter
@Headers('header')          // Request header
@Ip()                       // Client IP
@Req()                      // Request object
@Res()                      // Response object
```

### What is a Module in NestJS?

A **Module** is a class annotated with the `@Module()` decorator. It's the fundamental building block of a NestJS application, organizing related functionality into cohesive, reusable blocks of code.

**What Modules Do:**
- **Encapsulation**: Group related controllers, services, and providers together
- **Dependency Management**: Control what can be imported and exported
- **Organization**: Structure your application into logical features
- **Lazy Loading**: Enable code splitting and lazy module loading
- **Scope Management**: Control the visibility and lifecycle of providers

**Module Structure:**

```typescript
@Module({
  imports: [],      // Other modules whose exported providers are needed
  controllers: [],  // Controllers that handle HTTP requests
  providers: [],    // Services, repositories, and other injectable classes
  exports: [],      // Providers that should be available to other modules
})
export class AppModule {}
```

**Module Properties Explained:**

1. **imports**: Array of modules whose exported providers you want to use
   - Example: `imports: [DatabaseModule, AuthModule]`
   - Makes exported providers from those modules available in this module

2. **controllers**: Array of controllers that belong to this module
   - Example: `controllers: [UsersController, OrdersController]`
   - These controllers handle HTTP requests for this feature

3. **providers**: Array of services and other injectable classes
   - Example: `providers: [UsersService, EmailService]`
   - These are available for injection within this module

4. **exports**: Array of providers to make available to other modules
   - Example: `exports: [UsersService]`
   - Only exported providers can be used by importing modules

**Why Use Modules?**
- **Code Organization**: Keep related code together (feature-based structure)
- **Reusability**: Export modules to reuse in different parts of the app
- **Dependency Control**: Explicitly define what can be imported/exported
- **Testing**: Easier to test isolated features
- **Scalability**: Makes large applications manageable

**Example:**

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from '../email/email.module'; // Import another module

@Module({
  imports: [EmailModule],           // Import EmailModule to use EmailService
  controllers: [UsersController],   // Register controller
  providers: [UsersService],        // Register service
  exports: [UsersService],          // Export UsersService for other modules
})
export class UsersModule {}
```

### What is @Injectable()?

The `@Injectable()` decorator marks a class as a provider that can be injected into other classes via NestJS's dependency injection system. It tells NestJS that this class should be managed by the DI container.

**What @Injectable() Does:**
- Registers the class in NestJS's dependency injection container
- Makes the class available for injection into other classes
- Enables automatic instantiation and lifecycle management
- Allows NestJS to resolve dependencies automatically

**Why Use @Injectable()?**
- **Dependency Injection**: Enables constructor-based dependency injection
- **Singleton by Default**: Creates a single instance shared across the application
- **Testability**: Makes it easy to mock dependencies in tests
- **Lifecycle Management**: NestJS manages the creation and destruction of instances
- **Required for DI**: Without it, NestJS cannot inject the class into other classes

**How It Works:**
When you use `@Injectable()`, NestJS:
1. Registers the class in the DI container
2. Tracks its dependencies
3. Creates a singleton instance (by default)
4. Injects it wherever it's requested via constructor

**Example:**

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()  // This decorator makes UsersService injectable
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }

  create(user: any) {
    this.users.push(user);
    return user;
  }
}
```

**Without @Injectable():**
If you forget `@Injectable()`, NestJS will throw an error when trying to inject the service:
```
Nest can't resolve dependencies of the UsersController
```

### What is @Get()?

The `@Get()` decorator defines an HTTP GET endpoint in a controller. It maps HTTP GET requests to a specific route handler method.

**What @Get() Does:**
- Registers a route handler for HTTP GET requests
- Maps the method to a URL path
- Can accept a path string as an optional parameter
- Automatically serializes the return value to JSON

**Why Use @Get()?**
- **Declarative Routing**: Clean, declarative way to define routes
- **Type Safety**: TypeScript ensures correct parameter types
- **Automatic Serialization**: Return values are automatically converted to JSON
- **Route Organization**: Groups related routes in controllers

**Usage:**

```typescript
@Controller('users')  // Base route: /users
export class UsersController {
  @Get()              // GET /users - No additional path
  findAll() {
    return 'All users';
  }

  @Get('profile')      // GET /users/profile - Static path
  getProfile() {
    return 'User profile';
  }

  @Get(':id')         // GET /users/:id - Dynamic path parameter
  findOne(@Param('id') id: string) {
    return `User ${id}`;
  }

  @Get(':id/posts')   // GET /users/:id/posts - Multiple path segments
  getUserPosts(@Param('id') id: string) {
    return `Posts for user ${id}`;
  }
}
```

**Path Parameters:**
- Empty `@Get()` - Matches the base controller route
- `@Get('path')` - Static path segment
- `@Get(':param')` - Dynamic route parameter
- `@Get(':param1/:param2')` - Multiple parameters

**Other HTTP Method Decorators:**
- `@Post()` - HTTP POST (create resources)
- `@Put()` - HTTP PUT (full update)
- `@Patch()` - HTTP PATCH (partial update)
- `@Delete()` - HTTP DELETE (delete resources)
- `@Options()` - HTTP OPTIONS (CORS preflight)
- `@Head()` - HTTP HEAD (get headers only)
- `@All()` - All HTTP methods (use with caution)

### How to Create a Module

**Step-by-Step:**

1. Create a module file: `users.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

2. Import it in the root module: `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
```

### How to Create a Controller

**Step-by-Step:**

1. Create a controller file: `users.controller.ts`

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
}
```

**Key Points:**
- Use `@Controller('route-prefix')` to define the base route
- Inject services in the constructor
- Use HTTP method decorators for routes

### How to Create a Service

**Step-by-Step Process:**

**1. Create the Service File**

Create a new file: `users.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()  // Required decorator for DI
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  create(user: any) {
    this.users.push(user);
    return user;
  }

  update(id: string, userData: any) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      return this.users[index];
    }
    return null;
  }

  remove(id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
    return null;
  }
}
```

**2. Register Service in Module**

Add the service to the module's `providers` array:

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],  // Register service here
})
export class UsersModule {}
```

**3. Inject Service into Controller**

```typescript
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Service is automatically injected by NestJS

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

**Service Best Practices:**

1. **Always Use @Injectable()**: Required for dependency injection
2. **Single Responsibility**: Each service should have one clear purpose
3. **Stateless**: Services should generally be stateless (no instance variables that change)
4. **Business Logic Only**: Don't put HTTP-related code in services
5. **Dependency Injection**: Inject other services through constructor
6. **Error Handling**: Handle errors appropriately in services

**Service with Dependencies:**

```typescript
@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,  // Inject other service
    private readonly logger: LoggerService,       // Inject another service
  ) {}

  async createUser(userData: CreateUserDto) {
    const user = await this.saveUser(userData);
    await this.emailService.sendWelcomeEmail(user.email);
    this.logger.log(`User created: ${user.id}`);
    return user;
  }
}
```

**Key Points:**
- Always use `@Injectable()` decorator
- Contains business logic, not HTTP handling
- Can be injected into controllers or other services
- Can inject other services as dependencies
- Registered in module's `providers` array

### How to Create a Route

Routes in NestJS are created using decorators in controllers:

```typescript
@Controller('users')
export class UsersController {
  @Get()                    // GET /users
  findAll() {}

  @Get(':id')               // GET /users/:id
  findOne(@Param('id') id: string) {}

  @Post()                   // POST /users
  create(@Body() body: any) {}

  @Put(':id')               // PUT /users/:id
  update(@Param('id') id: string, @Body() body: any) {}

  @Delete(':id')            // DELETE /users/:id
  remove(@Param('id') id: string) {}
}
```

**Route Types:**
- Static routes: `@Get('profile')` → `/users/profile`
- Dynamic routes: `@Get(':id')` → `/users/123`
- Multiple parameters: `@Get(':userId/posts/:postId')` → `/users/123/posts/456`

---

## 4. Dependency Injection

### What is Dependency Injection?

**Dependency Injection (DI)** is a design pattern where objects receive their dependencies from an external source rather than creating them internally. Instead of a class creating its own dependencies, they are "injected" from outside.

**Traditional Approach (Without DI):**
```typescript
class UsersController {
  private usersService: UsersService;
  
  constructor() {
    // Creating dependency internally - BAD!
    this.usersService = new UsersService();
  }
}
```

**Dependency Injection Approach:**
```typescript
class UsersController {
  constructor(private usersService: UsersService) {
    // Dependency injected from outside - GOOD!
  }
}
```

**Why Use Dependency Injection?**
- **Loose Coupling**: Classes don't depend on concrete implementations
- **Testability**: Easy to mock dependencies in tests
- **Reusability**: Dependencies can be shared across classes
- **Maintainability**: Changes to dependencies don't require changing dependent classes
- **Flexibility**: Can swap implementations easily

### How NestJS Uses Dependency Injection

NestJS has a built-in, powerful Dependency Injection system that manages the creation and lifecycle of dependencies automatically.

**How NestJS DI Works:**

1. **Registration**: Classes are registered in modules using `providers` array
2. **Metadata**: `@Injectable()` decorator adds metadata for DI container
3. **Resolution**: NestJS automatically resolves dependencies by analyzing constructor parameters
4. **Instantiation**: Creates instances and manages their lifecycle
5. **Injection**: Injects dependencies into classes that need them

**NestJS DI Container:**
- Maintains a registry of all providers
- Creates singleton instances by default
- Resolves dependency chains automatically
- Manages provider lifecycle (creation, destruction)

**Example Flow:**
```
1. Module registers UsersService in providers
2. Controller declares UsersService in constructor
3. NestJS DI container sees the dependency
4. Container creates/retrieves UsersService instance
5. Container injects it into Controller constructor
```

**Key Features:**
- **Automatic Resolution**: No manual wiring needed
- **Singleton by Default**: One instance shared across app
- **Type-Based**: Uses TypeScript types to resolve dependencies
- **Circular Dependency Detection**: Warns about circular dependencies

### Injectable, Exports, and Providers in Dependency Injection

Understanding how `@Injectable()`, `exports`, and `providers` work together is crucial for mastering NestJS DI.

**1. @Injectable() Decorator**

The `@Injectable()` decorator marks a class as a provider that can be injected.

**What It Does:**
- Adds metadata to the class for the DI container
- Makes the class available for dependency injection
- Required for any class that will be injected

```typescript
@Injectable()  // This makes UsersService injectable
export class UsersService {
  findAll() {
    return [];
  }
}
```

**2. Providers**

Providers are classes that can be injected as dependencies. They are registered in a module's `providers` array.

**What Providers Are:**
- Services (most common)
- Repositories
- Factories
- Helpers
- Any injectable class

**How to Register Providers:**
```typescript
@Module({
  providers: [
    UsersService,        // Simple provider registration
    EmailService,        // Multiple providers
    {
      provide: 'CONFIG', // Custom provider with token
      useValue: { apiKey: '123' },
    },
  ],
})
export class UsersModule {}
```

**Provider Scope:**
- **DEFAULT (Singleton)**: One instance for entire application
- **REQUEST**: New instance per request
- **TRANSIENT**: New instance every time it's injected

**3. Exports**

Exports make providers available to other modules that import this module.

**What Exports Do:**
- Makes providers accessible outside the module
- Only exported providers can be used by importing modules
- Controls module's public API

**How Exports Work:**
```typescript
@Module({
  providers: [UsersService, InternalHelper], // Both are providers
  exports: [UsersService],                   // Only UsersService is exported
})
export class UsersModule {}
// Other modules can use UsersService but NOT InternalHelper
```

**How They Work Together:**

```typescript
// Step 1: Create a service with @Injectable()
@Injectable()
export class UsersService {
  findAll() {
    return [];
  }
}

// Step 2: Register as provider in module
@Module({
  providers: [UsersService],  // Register as provider
  exports: [UsersService],    // Export to make available to other modules
})
export class UsersModule {}

// Step 3: Import module in another module
@Module({
  imports: [UsersModule],  // Import the module
  // Now UsersService is available for injection
})
export class OrdersModule {}

// Step 4: Inject in controller/service
@Controller('orders')
export class OrdersController {
  constructor(private usersService: UsersService) {
    // UsersService is automatically injected
  }
}
```

**Complete Example:**

```typescript
// users.service.ts
@Injectable()  // 1. Mark as injectable
export class UsersService {
  findAll() {
    return ['user1', 'user2'];
  }
}

// users.module.ts
@Module({
  providers: [UsersService],  // 2. Register as provider
  exports: [UsersService],    // 3. Export to make available
})
export class UsersModule {}

// orders.module.ts
@Module({
  imports: [UsersModule],  // 4. Import module
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

// orders.controller.ts
@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,  // 5. Inject exported service
  ) {}
}
```

### What are Services and Why Do We Need Them?

**Services** are classes that contain business logic and are designed to be reusable across different parts of your application.

**What Services Are:**
- Classes decorated with `@Injectable()`
- Contain business logic (not HTTP request handling)
- Can be injected into controllers, other services, or any provider
- Stateless by default (but can maintain state if needed)

**Why Do We Need Services?**

1. **Separation of Concerns**
   - Controllers handle HTTP requests/responses
   - Services handle business logic
   - Clear division of responsibilities

2. **Reusability**
   - Business logic can be used in multiple controllers
   - Can be shared across different modules
   - Avoid code duplication

3. **Testability**
   - Easy to test business logic in isolation
   - Can mock services in controller tests
   - Unit test services independently

4. **Maintainability**
   - Business logic is centralized
   - Changes to logic only require updating the service
   - Easier to understand and modify

5. **Dependency Injection**
   - Services can depend on other services
   - NestJS manages all dependencies automatically
   - Enables complex dependency graphs

**Example Without Services (Bad):**
```typescript
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    // Business logic in controller - BAD!
    const users = [];
    // Complex filtering, validation, etc.
    return users;
  }
}
```

**Example With Services (Good):**
```typescript
// Service contains business logic
@Injectable()
export class UsersService {
  findAll() {
    // Complex business logic here
    return this.repository.findAll();
  }
}

// Controller only handles HTTP
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get()
  findAll() {
    return this.usersService.findAll(); // Delegate to service
  }
}
```

### How to Create a Service

Dependency injection in NestJS is done through constructor injection:

```typescript
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // Inject UsersService through constructor
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    // Use the injected service
    return this.usersService.findAll();
  }
}
```

**Important:**
- The service must be provided in the module
- Use `private readonly` for cleaner code
- NestJS automatically resolves dependencies

### How to Call a Service Method from Controller

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll(); // Call service method
  }
}
```

### How to Import a Module in Another Module

Importing modules allows you to use exported providers from other modules in your current module.

**Basic Module Import:**

```typescript
// users.module.ts
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

// orders.module.ts
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module'; // Import the module

@Module({
  imports: [UsersModule],  // Import UsersModule
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
```

**What Happens When You Import:**
1. All exported providers from the imported module become available
2. NestJS DI container can resolve these providers
3. You can inject them in controllers, services, or other providers
4. The imported module's providers are part of the DI container

**Multiple Module Imports:**

```typescript
@Module({
  imports: [
    UsersModule,      // Import UsersModule
    ProductsModule,   // Import ProductsModule
    AuthModule,       // Import AuthModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
```

**Key Points:**
- Use `imports` array in `@Module()` decorator
- Only exported providers are available
- Import the module, not individual services
- NestJS handles dependency resolution automatically

### How to Use a Service of One Module into Another Module

To use a service from one module in another module, you need to: export it from the source module, import the module, and then inject the service.

**Complete Step-by-Step Process:**

**Step 1: Export the Service from Source Module**

The service must be in the `exports` array to be available to other modules.

```typescript
// users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],        // Register as provider
  exports: [UsersService],         // Export to make available to other modules
})
export class UsersModule {}
```

**Step 2: Import the Module in Target Module**

Import the module that exports the service you need.

```typescript
// orders.module.ts
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module'; // Import the module

@Module({
  imports: [UsersModule],          // Import UsersModule
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
```

**Step 3: Inject the Service in Target Controller/Service**

Now you can inject the service normally using constructor injection.

```typescript
// orders.controller.ts
import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UsersService } from '../users/users.service'; // Import the service type

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService, // Inject UsersService
  ) {}

  @Get()
  findAll() {
    // Use the injected service from another module
    const users = this.usersService.findAll();
    return this.ordersService.findAll();
  }
}
```

**Or Inject in Another Service:**

```typescript
// orders.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(private readonly usersService: UsersService) {
    // Inject UsersService into OrdersService
  }

  async createOrder(userId: string, orderData: any) {
    // Use UsersService to validate user exists
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Create order logic...
  }
}
```

**Important Rules:**

1. **Service Must Be Exported**: Only services in the `exports` array can be used by other modules
2. **Module Must Be Imported**: You must import the module, not just the service class
3. **Type Import**: Import the service class for TypeScript typing
4. **Automatic Injection**: NestJS automatically resolves and injects the service

**Common Mistakes:**

❌ **Wrong**: Trying to inject without exporting
```typescript
@Module({
  providers: [UsersService],
  // Missing exports!
})
export class UsersModule {}
```

❌ **Wrong**: Importing service directly instead of module
```typescript
@Module({
  imports: [UsersService], // Wrong! Should import UsersModule
})
export class OrdersModule {}
```

✅ **Correct**: Export and import properly
```typescript
// Source module
@Module({
  providers: [UsersService],
  exports: [UsersService], // Export it
})
export class UsersModule {}

// Target module
@Module({
  imports: [UsersModule], // Import the module
})
export class OrdersModule {}
```

### What is Circular Dependency Injection?

**Circular Dependency** occurs when two or more modules depend on each other directly or indirectly, creating a dependency cycle.

**Example of Circular Dependency:**

```typescript
// users.module.ts
@Module({
  imports: [OrdersModule],  // UsersModule imports OrdersModule
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

// orders.module.ts
@Module({
  imports: [UsersModule],  // OrdersModule imports UsersModule
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
```

**Why Circular Dependencies Are Problematic:**

1. **Initialization Issues**: Modules can't determine initialization order
2. **Runtime Errors**: Can cause "Cannot read property of undefined" errors
3. **Design Smell**: Indicates poor module design
4. **Testing Difficulties**: Hard to test modules with circular dependencies

**How to Identify Circular Dependencies:**

NestJS will show an error like:
```
Nest can't resolve dependencies of the UsersService (OrdersService, ?).
Please make sure that the argument at index [0] is available in the UsersModule context.
```

### How to Resolve Circular Dependencies

**Solution 1: Use `forwardRef()` (Recommended)**

Use `forwardRef()` in both modules to break the circular dependency.

```typescript
// users.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [forwardRef(() => OrdersModule)],  // Use forwardRef
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

// orders.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => OrdersModule)],  // Use forwardRef
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
```

**Solution 2: Use `forwardRef()` in Constructor Injection**

If services depend on each other, use `forwardRef()` in constructors too.

```typescript
// users.service.ts
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService,
  ) {}
}

// orders.service.ts
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}
}
```

**Solution 3: Refactor to Remove Circular Dependency (Best Practice)**

The best solution is to refactor your code to eliminate the circular dependency.

**Option A: Create a Shared Module**

```typescript
// shared.module.ts
@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}

// Both modules import SharedModule instead of each other
```

**Option B: Extract Common Functionality**

```typescript
// Create a common service that both can use
@Module({
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
```

**Option C: Use Events/Message Pattern**

Instead of direct dependencies, use events or message queues for communication.

**Best Practices:**

1. **Avoid Circular Dependencies**: Design modules to avoid circular dependencies
2. **Use forwardRef() Sparingly**: Only when absolutely necessary
3. **Refactor When Possible**: Circular dependencies often indicate design issues
4. **Create Shared Modules**: Extract common functionality to shared modules
5. **Use Dependency Inversion**: Depend on abstractions, not concrete implementations

**Complete Example with forwardRef():**

```typescript
// users.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [forwardRef(() => OrdersModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

// orders.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
```

**Key Points:**
- Circular dependencies should be avoided when possible
- Use `forwardRef()` to resolve circular dependencies
- Apply `forwardRef()` in both modules and constructors if needed
- Consider refactoring to eliminate circular dependencies

---

## 5. Security with bcrypt

### What is bcrypt?

**bcrypt** is a password hashing function designed to be computationally expensive, making it resistant to brute-force attacks. It's commonly used to hash passwords before storing them in databases.

**Why Use bcrypt?**
- Never store passwords in plain text
- Protects against rainbow table attacks
- Automatically handles salting
- Adjustable cost factor for security vs. performance

### Installation

```bash
npm install bcrypt
npm install -D @types/bcrypt
```

### Usage Example

```typescript
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  // Hash a password
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  // Compare password with hash
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
```

**Usage in a Service:**

```typescript
@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) {}

  async createUser(createUserDto: CreateUserDto) {
    // Hash password before storing
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );
    return this.saveUser({ ...createUserDto, password: hashedPassword });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    
    const isValid = await this.authService.comparePassword(password, user.password);
    return isValid ? user : null;
  }
}
```

---

## 6. Request Handling

### What are Query Parameters, Optional Parameters, and Params in Routes?

Understanding the different types of parameters helps you design clean and intuitive APIs.

**1. Route Parameters (Params)**
- **Location**: Part of the URL path itself
- **Format**: `/users/:id` where `:id` is the parameter
- **Required**: Yes, by default (unless marked optional)
- **Use Case**: Identifying specific resources (e.g., user ID, product ID)
- **Example**: `/users/123` → `id = "123"`
- **Access**: Using `@Param('id')` decorator

**2. Query Parameters**
- **Location**: Appended to URL after `?`
- **Format**: `/users?page=1&limit=10`
- **Required**: No, optional by default
- **Use Case**: Filtering, pagination, sorting, searching
- **Example**: `/users?page=1&limit=10&search=john` → `page = "1"`, `limit = "10"`, `search = "john"`
- **Access**: Using `@Query('key')` or `@Query()` decorator
- **Note**: Always received as strings, need type conversion

**3. Optional Route Parameters**
- **Location**: Part of URL path but may be absent
- **Format**: `/users/:id?` where `?` makes it optional
- **Required**: No
- **Use Case**: Routes that work with or without an identifier
- **Example**: `/users` or `/users/123` both match
- **Access**: Using `@Param('id')` with optional type (`id?: string`)

### How to Get Those Parameters

**Route Parameters:**

```typescript
@Controller('users')
export class UsersController {
  // Get single parameter
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `User ID: ${id}`;
  }

  // Get all parameters
  @Get(':userId/posts/:postId')
  findPost(@Param() params: { userId: string; postId: string }) {
    return `User ${params.userId}, Post ${params.postId}`;
  }
}
```

**Query Parameters:**

```typescript
@Controller('users')
export class UsersController {
  // Get single query parameter
  @Get()
  findAll(@Query('page') page: string) {
    return `Page: ${page}`;
  }

  // Get all query parameters
  @Get()
  findAll(@Query() query: { page?: string; limit?: string }) {
    return { page: query.page || '1', limit: query.limit || '10' };
  }
}
```

**Optional Parameters:**

```typescript
@Controller('users')
export class UsersController {
  // Optional route parameter
  @Get(':id?')
  findOne(@Param('id') id?: string) {
    return id ? `User ID: ${id}` : 'All users';
  }

  // Optional query parameters (optional by default)
  @Get()
  findAll(@Query('page') page?: string) {
    return { page: page || '1' };
  }
}
```

### What are Body Decorators and How to Use Them?

The `@Body()` decorator extracts and parses the request body from HTTP requests (POST, PUT, PATCH). It automatically deserializes JSON data sent in the request body into a JavaScript object.

**What @Body() Does:**
- Extracts the request body from the HTTP request
- Parses JSON data automatically
- Binds the parsed data to the parameter
- Works with ValidationPipe to validate data
- Transforms plain objects to DTO class instances (when transform is enabled)

**Why Use @Body()?**
- Type safety: Ensures you receive data in the expected format
- Automatic parsing: No need to manually parse JSON
- Validation: Works seamlessly with ValidationPipe and DTOs
- Clean code: Declarative way to access request data

**Basic Usage:**

```typescript
@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // createUserDto is automatically parsed from request body
    // Example request body: { "name": "John", "email": "john@example.com" }
    return this.usersService.create(createUserDto);
  }
}
```

**Extracting Specific Properties:**

```typescript
@Controller('users')
export class UsersController {
  @Post()
  create(
    @Body('name') name: string,  // Extract only 'name' property
    @Body('email') email: string, // Extract only 'email' property
  ) {
    return { name, email };
  }
}
```

**Other Request Decorators:**
- `@Headers('key')` - Get specific header value
- `@Headers()` - Get all headers as an object
- `@Ip()` - Get client IP address
- `@HostParam()` - Get host parameter from the request
- `@Req()` - Get the entire request object (Express/Fastify)
- `@Res()` - Get the response object (use with caution)

---

## 7. Advanced Concepts

### What are Providers in NestJS?

**Providers** are classes that can be injected as dependencies. They are decorated with `@Injectable()` and registered in a module's `providers` array.

**Types of Providers:**
- Services
- Repositories
- Factories
- Helpers
- Any class that provides functionality

**Example:**

```typescript
// Custom provider
@Injectable()
export class ConfigService {
  getDatabaseUrl(): string {
    return process.env.DATABASE_URL;
  }
}

// Register in module
@Module({
  providers: [ConfigService],
})
export class AppModule {}
```

**Custom Providers:**

```typescript
@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useValue: { host: 'localhost', port: 5432 },
    },
    {
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        // Async initialization
        return await createConnection();
      },
    },
  ],
})
export class AppModule {}
```

### What are Filters?

**Exception Filters** handle exceptions thrown during request processing. They catch exceptions and transform them into appropriate HTTP responses with proper status codes and error messages.

**What Filters Do:**
- **Catch Exceptions**: Intercept exceptions thrown anywhere in the request pipeline
- **Transform Errors**: Convert exceptions to user-friendly HTTP responses
- **Logging**: Log errors for debugging and monitoring
- **Format Responses**: Standardize error response format across the application
- **Status Codes**: Set appropriate HTTP status codes

**When Filters Execute:**
Filters run when an exception is thrown:
```
Request → ... → Exception Thrown → Exception Filter → Response
```

**Why Use Filters?**
- **Error Handling**: Centralized error handling logic
- **Consistency**: Uniform error response format
- **Security**: Don't expose sensitive error details to clients
- **Logging**: Track and log errors for debugging
- **User Experience**: Provide meaningful error messages

**Built-in Exceptions:**
- `BadRequestException` (400) - Invalid request data
- `UnauthorizedException` (401) - Not authenticated
- `ForbiddenException` (403) - Authenticated but not authorized
- `NotFoundException` (404) - Resource not found
- `ConflictException` (409) - Resource conflict (e.g., duplicate)
- `InternalServerErrorException` (500) - Server error
- `NotAcceptableException` (406) - Content negotiation failed
- `RequestTimeoutException` (408) - Request timeout

**Usage:**

```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }
}
```

**Custom Exception Filter:**

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
```

**Using Filters:**

```typescript
// Method level
@UseFilters(HttpExceptionFilter)
@Get(':id')
findOne(@Param('id') id: string) {}

// Controller level
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {}

// Global level (in main.ts)
app.useGlobalFilters(new HttpExceptionFilter());
```

### What are Guards?

**Guards** are classes that determine whether a request should be handled by the route handler. They run after middleware but before interceptors and pipes in the request lifecycle.

**What Guards Do:**
- **Authentication**: Verify if the user is authenticated (logged in)
- **Authorization**: Check if the user has permission to access the resource
- **Access Control**: Determine if the request should proceed
- **Return Boolean**: Return `true` to allow, `false` or throw exception to deny

**When Guards Execute:**
Guards run in the request lifecycle:
```
Request → Middleware → Guards → Interceptors → Pipes → Controller Handler
```

**Why Use Guards?**
- **Security**: Protect routes from unauthorized access
- **Separation of Concerns**: Keep authentication/authorization logic separate
- **Reusability**: Apply same guard to multiple routes
- **Flexibility**: Can be applied at method, controller, or global level

**Use Cases:**
- **Authentication**: Check if user has valid token/session
- **Authorization**: Verify user has required permissions
- **Role-based Access**: Restrict access based on user roles
- **Rate Limiting**: Prevent abuse by limiting request frequency
- **IP Filtering**: Allow/deny requests from specific IPs

**How Guards Work:**
1. Guard implements `CanActivate` interface
2. Has `canActivate()` method that returns boolean or Promise<boolean>
3. Returns `true` → request proceeds
4. Returns `false` or throws exception → request is denied (403 Forbidden)

**Example Guard:**

```typescript
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // Validate token logic here
    return true; // Return true to allow, false to deny
  }
}
```

**Using Guards:**

```typescript
// Method level
@UseGuards(AuthGuard)
@Get('profile')
getProfile() {}

// Controller level
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {}

// Global level (in app.module.ts)
providers: [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
]
```

### What are Pipes?

**Pipes** are classes that transform input data and validate it before it reaches the route handler. They run in the request pipeline after guards but before the controller method executes.

**What Pipes Do:**
- **Transform**: Convert input data from one format to another (e.g., string to number)
- **Validate**: Check if data meets certain criteria
- **Sanitize**: Clean and normalize input data
- **Type Conversion**: Automatically convert types (string → number, string → boolean)

**When Pipes Execute:**
Pipes run in the request lifecycle:
```
Request → Middleware → Guards → Pipes → Controller Handler
```

**Why Use Pipes?**
- **Data Validation**: Ensure data is valid before processing
- **Type Safety**: Convert strings to proper types automatically
- **Security**: Sanitize input to prevent injection attacks
- **Consistency**: Standardize data format across the application
- **Error Handling**: Provide clear error messages for invalid data

**Built-in Pipes:**

1. **ValidationPipe** - Validates and transforms data using class-validator
   - Most commonly used pipe
   - Validates DTOs automatically
   - Transforms plain objects to class instances

2. **ParseIntPipe** - Converts string to integer
   - Throws error if conversion fails
   - Useful for route parameters and query strings

3. **ParseFloatPipe** - Converts string to float
   - Similar to ParseIntPipe but for decimal numbers

4. **ParseBoolPipe** - Converts string to boolean
   - Converts "true"/"false" strings to boolean values

5. **ParseArrayPipe** - Parses array from query string
   - Converts comma-separated strings to arrays
   - Example: `?tags=js,ts,node` → `['js', 'ts', 'node']`

6. **ParseUUIDPipe** - Validates UUID format
   - Ensures parameter is a valid UUID
   - Throws error if format is invalid

7. **ParseEnumPipe** - Validates enum values
   - Ensures value matches one of the enum options

8. **DefaultValuePipe** - Provides default values
   - Sets default value if parameter is missing
   - Useful for optional query parameters

**Usage:**

```typescript
@Controller('users')
export class UsersController {
  // Parse ID as integer
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // Default value
  @Get()
  findAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number) {
    return this.usersService.findAll(page);
  }
}
```

**Custom Pipe:**

```typescript
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

---

## 8. Validation and DTOs

### What is a DTO, Why to Use Them, and How to Use Them?

**DTO (Data Transfer Object)** is a class that defines the structure, validation rules, and type information for data being transferred between layers (client to server, service to service, etc.).

**What DTOs Do:**
- Define the exact shape and structure of data
- Provide type safety at compile time
- Enable runtime validation with decorators
- Serve as documentation for API contracts
- Prevent accepting unexpected or malicious data

**Why Use DTOs?**
- **Type Safety**: TypeScript ensures you're working with the correct data types
- **Validation**: Automatically validate incoming data before it reaches your business logic
- **Documentation**: DTOs serve as self-documenting code showing what data is expected
- **Security**: Prevents mass assignment attacks by only accepting whitelisted properties
- **Maintainability**: Changes to data structure are centralized in one place

**Basic DTO Example:**

```typescript
// create-user.dto.ts
export class CreateUserDto {
  name: string;
  email: string;
  age: number;
  password: string;
}

// users.controller.ts
@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // TypeScript knows the structure of createUserDto
    // ValidationPipe will validate it matches the DTO structure
    return this.usersService.create(createUserDto);
  }
}
```

**DTO with Validation Decorators:**

```typescript
import {
  IsString,
  IsEmail,
  IsNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsString()                    // Must be a string
  @IsNotEmpty()                  // Cannot be empty
  @MinLength(2)                  // Minimum 2 characters
  @MaxLength(50)                 // Maximum 50 characters
  name: string;

  @IsEmail()                     // Must be a valid email format
  @IsNotEmpty()
  email: string;

  @IsNumber()                    // Must be a number
  @Min(18)                        // Minimum value is 18
  @Max(100)                       // Maximum value is 100
  age: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)                  // Password must be at least 8 characters
  password: string;
}
```

### What is Class Validator?

**Class Validator** is a library that uses decorators to validate class properties.

**Installation:**

```bash
npm install class-validator class-transformer
```

**Why Use Class Validator?**
- Declarative validation
- Type-safe
- Easy to use with decorators
- Comprehensive validation rules

**How to Use Class Validator:**

Class Validator uses decorators to add validation rules to DTO properties. When ValidationPipe is enabled, these decorators automatically validate incoming data.

**Basic Example:**

```typescript
import {
  IsString,
  IsEmail,
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()                    // Validates that value is a string
  @IsNotEmpty()                  // Validates that value is not empty (not null, undefined, or empty string)
  @MinLength(2)                  // Validates minimum string length
  @MaxLength(50)                 // Validates maximum string length
  name: string;

  @IsEmail()                     // Validates email format (e.g., user@example.com)
  @IsNotEmpty()
  email: string;

  @IsNumber()                    // Validates that value is a number
  @Min(18)                        // Validates minimum numeric value
  @Max(100)                       // Validates maximum numeric value
  age: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)                  // Validates minimum string length
  password: string;
}
```

**Comprehensive Validation Decorators:**

```typescript
import {
  // Type validations
  IsString,           // Must be a string
  IsNumber,           // Must be a number
  IsInt,              // Must be an integer
  IsBoolean,          // Must be a boolean
  IsArray,            // Must be an array
  IsObject,           // Must be an object
  IsDate,             // Must be a Date object
  IsDateString,       // Must be a date string (ISO format)
  IsEnum,             // Must be one of the enum values
  
  // String validations
  IsNotEmpty(),       // Cannot be empty, null, or undefined
  IsOptional(),       // Property is optional (can be undefined)
  MinLength(5),       // Minimum string length
  MaxLength(20),      // Maximum string length
  Matches(/regex/),   // Must match regular expression pattern
  IsAlpha(),          // Must contain only letters
  IsAlphanumeric(),   // Must contain only letters and numbers
  IsUppercase(),      // Must be uppercase
  IsLowercase(),      // Must be lowercase
  
  // Number validations
  Min(0),             // Minimum numeric value
  Max(100),           // Maximum numeric value
  IsPositive(),       // Must be a positive number
  IsNegative(),       // Must be a negative number
  IsInt(),            // Must be an integer
  
  // Array validations
  ArrayMinSize(1),    // Minimum array length
  ArrayMaxSize(10),   // Maximum array length
  ArrayNotEmpty(),    // Array cannot be empty
  
  // Object validations
  ValidateNested(),   // Validates nested object properties
  IsInstance(),       // Must be an instance of a class
  
  // Custom validations
  ValidateIf(),       // Conditional validation
  IsIn([...]),        // Value must be in the provided array
} from 'class-validator';
import { Type } from 'class-transformer';

// Complete example with nested validation
export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @Matches(/^\d{5}$/)  // Must be exactly 5 digits
  zipCode: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)  // Must contain lowercase, uppercase, and number
  password: string;

  @IsOptional()                    // Address is optional
  @ValidateNested()                // Validate nested object
  @Type(() => CreateAddressDto)    // Transform to CreateAddressDto instance
  address?: CreateAddressDto;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })        // Each array element must be a string
  hobbies: string[];
}
```

### How to Create an Enum and How to Use Them?

**Enums** define a set of named constants, making code more readable and type-safe.

**Creating an Enum:**

```typescript
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}
```

**Using Enum in DTO:**

```typescript
import { IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEnum(UserRole)
  role: UserRole; // Must be one of: 'admin', 'user', 'moderator'
}

export class UpdateStatusDto {
  @IsEnum(Status)
  status: Status; // Must be one of: 'active', 'inactive', 'pending'
}
```

**Using Enum in Controller:**

```typescript
@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query('role') role?: UserRole) {
    return this.usersService.findAll(role);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

**Why Use Enums?**
- Type safety - prevents invalid values
- Better IDE autocomplete
- Self-documenting code
- Easy to refactor

### What are Validation Pipes?

**ValidationPipe** is a built-in pipe that automatically validates incoming data using class-validator decorators. It's one of the most important pipes in NestJS for ensuring data integrity.

**What ValidationPipe Does:**
- **Validates Data**: Checks if incoming data matches the DTO structure and validation rules
- **Transforms Data**: Converts plain objects to DTO class instances
- **Strips Properties**: Removes properties not defined in the DTO (when whitelist is enabled)
- **Throws Errors**: Automatically throws `BadRequestException` if validation fails
- **Type Conversion**: Converts string values to appropriate types (number, boolean, etc.)

**How ValidationPipe Works:**
1. Receives incoming request data (body, query, params)
2. Transforms plain object to DTO class instance (if transform is enabled)
3. Runs all validation decorators from class-validator
4. If validation passes → data proceeds to controller
5. If validation fails → throws BadRequestException with error details

**ValidationPipe Options:**
- `whitelist`: Remove properties without decorators
- `forbidNonWhitelisted`: Throw error if non-whitelisted properties exist
- `transform`: Transform payloads to DTO instances
- `transformOptions`: Configure transformation behavior
- `disableErrorMessages`: Disable detailed error messages
- `validationError`: Customize error response format

**How to Use ValidationPipe in a Particular Controller:**

```typescript
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

**How to Use ValidationPipe Globally:**

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  await app.listen(3000);
}
bootstrap();
```

**Or in app.module.ts:**

```typescript
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
```

### What is Whitelist in ValidationPipe?

**Whitelist** is a ValidationPipe option that automatically removes (strips) properties from the incoming data that don't have validation decorators in the DTO.

**What Whitelist Does:**
- **Filters Properties**: Only keeps properties that have decorators in the DTO
- **Removes Unknown Fields**: Strips out any extra properties sent by the client
- **Silent Removal**: By default, removes properties without throwing an error
- **Security Feature**: Prevents mass assignment attacks

**How It Works:**
1. Client sends: `{ name: 'John', email: 'john@example.com', isAdmin: true }`
2. DTO only has decorators on `name` and `email`
3. With whitelist: `{ name: 'John', email: 'john@example.com' }` (isAdmin removed)
4. Without whitelist: `{ name: 'John', email: 'john@example.com', isAdmin: true }` (isAdmin kept)

**Why Should We Use It?**
- **Security**: Prevents accepting unwanted or malicious data
- **Data Integrity**: Ensures only expected properties are processed
- **Prevents Mass Assignment**: Stops attackers from setting unauthorized fields
- **Clean Data**: Only validated properties reach your business logic
- **Type Safety**: Maintains expected data structure

**Example Attack Prevention:**
Without whitelist, an attacker could send:
```json
{
  "name": "John",
  "email": "john@example.com",
  "isAdmin": true,  // Unauthorized field!
  "role": "admin"   // Unauthorized field!
}
```

With whitelist enabled, these extra fields are automatically removed.

**How to Use It:**

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Strips non-whitelisted properties
  }),
);
```

**Example:**
- Request: `{ name: 'John', email: 'john@example.com', isAdmin: true }`
- With whitelist: `{ name: 'John', email: 'john@example.com' }` (isAdmin removed)
- Without whitelist: `{ name: 'John', email: 'john@example.com', isAdmin: true }` (isAdmin kept)

### What is forbidNonWhitelisted Property?

**forbidNonWhitelisted** throws an error if non-whitelisted properties are present in the request body.

**Why to Use It:**
- Stricter validation
- Immediate feedback on invalid requests
- Prevents silent data loss

**How to Use It:**

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Must be true for forbidNonWhitelisted to work
    forbidNonWhitelisted: true, // Throws error if extra properties exist
  }),
);
```

**Example:**
- Request: `{ name: 'John', email: 'john@example.com', isAdmin: true }`
- With forbidNonWhitelisted: `400 Bad Request - "property isAdmin should not exist"`
- Without forbidNonWhitelisted: `200 OK - { name: 'John', email: 'john@example.com' }` (isAdmin stripped)

### What is Transform Property?

**Transform** is a ValidationPipe option that automatically transforms incoming payloads to DTO class instances and performs type conversion.

**What Transform Does:**
- **Converts Plain Objects**: Transforms plain JavaScript objects to DTO class instances
- **Type Conversion**: Automatically converts string values to numbers, booleans, dates, etc.
- **Enables Validation**: DTO class methods and getters become available
- **Type Coercion**: Handles implicit type conversions (e.g., "123" → 123)

**Why Use Transform:**
- **Type Safety**: Ensures data types match DTO definitions
- **Automatic Conversion**: No manual parsing needed (especially for query params)
- **Class Methods**: DTO class methods become available
- **Consistency**: Data is always in the expected format

**How It Works:**
1. Request comes in with data (often as strings from query params or JSON)
2. Transform converts plain object to DTO class instance
3. Type conversion happens based on DTO property types
4. Validation runs on the transformed instance
5. Controller receives properly typed DTO instance

**Example Without Transform:**
- Query param: `?age=25` → received as string `"25"`
- DTO expects: `number`
- Result: Type mismatch, validation may fail

**Example With Transform:**
- Query param: `?age=25` → automatically converted to number `25`
- DTO receives: `number` type
- Result: Proper type, validation passes

**How to Use It:**

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    transform: true, // Automatically transform payloads
    transformOptions: {
      enableImplicitConversion: true, // Enable implicit type conversion
    },
  }),
);
```

**Example:**
- Request: `{ age: '25', isActive: 'true' }` (strings from query/params)
- With transform: `{ age: 25, isActive: true }` (converted to correct types)
- Without transform: `{ age: '25', isActive: 'true' }` (remains as strings)

**Type Transformation with DTO:**

```typescript
export class PaginationDto {
  @IsNumber()
  @Type(() => Number) // Explicit type conversion
  page: number;

  @IsNumber()
  @Type(() => Number)
  limit: number;
}

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query() query: PaginationDto) {
    // query.page and query.limit are automatically numbers
  }
}
```

---

## 9. Class Transformer

### What is Class Transformer and How to Use It and Why to Use It?

**Class Transformer** is a library that transforms plain objects to class instances and vice versa.

**Why Use Class Transformer?**
- Convert plain objects to class instances
- Transform data structures
- Exclude/include properties
- Transform property names
- Handle nested objects

**Installation:**

```bash
npm install class-transformer
```

**Common Decorators:**

```typescript
import {
  Exclude,
  Expose,
  Transform,
  Type,
} from 'class-transformer';

export class UserDto {
  @Expose() // Include in transformation
  name: string;

  @Exclude() // Exclude from transformation
  password: string;

  @Expose({ name: 'full_name' }) // Transform property name
  fullName: string;

  @Transform(({ value }) => value.toUpperCase()) // Transform value
  email: string;

  @Type(() => Date) // Transform to Date instance
  createdAt: Date;

  @Type(() => AddressDto) // Transform nested object
  address: AddressDto;
}
```

**Usage in NestJS:**

```typescript
import { plainToInstance } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Exclude() // Never expose password
  password: string;
}

@Controller('users')
export class UsersController {
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    // Transform to exclude password
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
```

---

## 10. Mapped Types

### What is Mapped Type DTO?

**Mapped Types** are utility types that create new DTOs based on existing ones, reducing code duplication.

**Common Mapped Types:**
- `PartialType` - Makes all properties optional
- `PickType` - Picks specific properties
- `OmitType` - Omits specific properties
- `IntersectionType` - Combines multiple types

### What is Partial Type DTO?

**PartialType** creates a new DTO with all properties from the original DTO made optional.

**What It's Used For:**
- Update DTOs (PATCH requests)
- Partial updates
- Reusing validation rules

**How to Use It:**

```typescript
import { PartialType } from '@nestjs/mapped-types';

// Base DTO
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNumber()
  @Min(18)
  age: number;
}

// Partial DTO (all properties optional)
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// Usage
@Controller('users')
export class UsersController {
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto, // All properties are optional
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
```

**What PartialType Does:**
- `CreateUserDto`: All properties required
- `UpdateUserDto`: All properties optional (after PartialType)

### Other Mapped Types

**PickType - Select specific properties:**

```typescript
import { PickType } from '@nestjs/mapped-types';
export class UserProfileDto extends PickType(CreateUserDto, ['name', 'email']) {}
```

**OmitType - Exclude specific properties:**

```typescript
import { OmitType } from '@nestjs/mapped-types';
export class UserWithoutPasswordDto extends OmitType(CreateUserDto, ['password']) {}
```

**IntersectionType - Combine multiple types:**

```typescript
import { IntersectionType } from '@nestjs/mapped-types';

export class AdditionalUserInfo {
  @IsString()
  bio: string;
}

export class CreateUserWithBioDto extends IntersectionType(
  CreateUserDto,
  AdditionalUserInfo,
) {}
```