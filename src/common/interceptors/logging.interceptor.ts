import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user, body } = request;
    const userId = user?.id || 'anonymous';
    const userType = user?.driverId ? 'driver' : 'passenger';

    const startTime = Date.now();

    this.logger.log(`[${method}] ${url} - User: ${userId} (${userType})`);

    // Log request body for audit (excluding sensitive data)
    if (body && Object.keys(body).length > 0) {
      const sanitizedBody = this.sanitizeBody(body);
      this.logger.debug(`Request body: ${JSON.stringify(sanitizedBody)}`);
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          this.logger.log(
            `[${method}] ${url} - ${context.switchToHttp().getResponse().statusCode} - ${duration}ms`,
          );

          // Log important operations for audit
          if (this.isAuditableOperation(method, url)) {
            this.logger.log(
              `[AUDIT] ${method} ${url} by ${userId} (${userType}) - Success in ${duration}ms`,
            );
          }
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            `[${method}] ${url} - ERROR ${error.status || 500} - ${duration}ms - ${error.message}`,
          );

          // Always log errors for audit
          this.logger.error(
            `[AUDIT] ${method} ${url} by ${userId} (${userType}) - ERROR: ${error.message}`,
          );
        },
      }),
    );
  }

  private sanitizeBody(body: any): any {
    const sensitive = ['password', 'token', 'authorization', 'secret'];
    const sanitized = { ...body };

    for (const key of Object.keys(sanitized)) {
      if (sensitive.some((s) => key.toLowerCase().includes(s))) {
        sanitized[key] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  private isAuditableOperation(method: string, url: string): boolean {
    const auditablePatterns = [
      '/drivers/.*/status',
      '/drivers/.*/availability',
      '/rides/.*/accept',
      '/rides/.*/reject',
      '/rides/.*/cancel',
      '/rides/.*/complete',
      '/payments/',
    ];

    return (
      auditablePatterns.some((pattern) => new RegExp(pattern).test(url)) ||
      ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
    );
  }
}
