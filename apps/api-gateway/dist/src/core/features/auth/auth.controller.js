"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_service_1 = require("./auth.service");
const rxjs_1 = require("rxjs");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService, authServiceClient) {
        this.authService = authService;
        this.authServiceClient = authServiceClient;
    }
    onModuleInit() {
        this.authServiceClient.subscribeToResponseOf('login');
        this.authServiceClient.subscribeToResponseOf('register');
    }
    login(payload) {
        return (0, rxjs_1.lastValueFrom)(this.authServiceClient
            .send('login', payload)
            .pipe((0, rxjs_1.catchError)((error) => (0, rxjs_1.throwError)(() => new common_1.HttpException(error.response, error.status)))));
    }
    async register(payload) {
        const data = await (0, rxjs_1.lastValueFrom)(this.authServiceClient.send('register', payload).pipe((0, rxjs_1.catchError)((error) => {
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(error.response, error.status));
        })));
        return data;
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(1, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        microservices_1.ClientKafka])
], AuthController);
//# sourceMappingURL=auth.controller.js.map