import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateContactDto } from '../contact/dto/create-contact.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  login(@Body() loginDto : LoginDto ){
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @Post('signup')
  signUp(@Body() createUserDto : CreateContactDto){
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request){
    const id = req.user['sub'];
    this.authService.logout(id);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refresh(@Req() req: Request){
    const id = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(id, refreshToken);
  }
}
