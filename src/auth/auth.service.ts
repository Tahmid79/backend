import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ContactService } from '../contact/contact.service';
import { CreateContactDto } from '../contact/dto/create-contact.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor( private contactService: ContactService, private jwtService: JwtService ){}
    
    async signUp(newUser: CreateContactDto){
        const userExists = await this.contactService.findByEmail({email : newUser.email});
        if(userExists){
            throw new BadRequestException("User already exists");
        }
        const password = newUser.password;
        const hashedPassword = await this.hashData(password);
        newUser['password'] = hashedPassword;
        const createdUser = await this.contactService.create(newUser);
        const tokens = await this.createTokens(createdUser._id, createdUser.email);
        await this.updateRefreshToken(createdUser['_id'], createdUser.email);
        return tokens;
    }

    async signIn(email: string, password: string){
        const user = await this.contactService.findByEmail({email});
        if(!user){
            throw new BadRequestException("User does not exist");
        }
        const paswordMatches = await argon2.verify(user.password, password);
        if(!paswordMatches) throw new UnauthorizedException("Incorrect password");  
        
        const tokens = await this.createTokens(user._id, user.email);
        await this.updateRefreshToken(user['_id'], user.email);
        return tokens;
    }

    async updateRefreshToken(contactId: string, refreshToken: string){
        const hashedRefreshToken = await this.hashData(refreshToken);
        return this.contactService.update(contactId, {refreshToken: hashedRefreshToken});
    }

    async createTokens(userId: string, email: string){
        const [accessToken, refreshToken] =  await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email: email
                },
                {
                    secret: 'secret',
                    expiresIn: '15m'
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email: email
                },
                {
                    secret: 'refreshSecret',
                    expiresIn: '2d'
                }
            )
        ]) ;
        return {accessToken, refreshToken};
    }

    async refreshTokens(id: string, refreshToken: string){
        const contact = await this.contactService.findOne(id);
        if(!contact || !contact.refreshToken){
            throw new ForbiddenException("Access Denied");
        }
        const refreshTokenMatches = await argon2.verify(contact.refreshToken, refreshToken);
        if(!refreshTokenMatches)throw new ForbiddenException("Access Denied");
        const tokens = this.createTokens(id, contact.email);
        await this.updateRefreshToken(id, contact.email);
        return tokens;
    }

    async logout(id: string){
        return this.contactService.update(id, {refreshToken: null});
    }

    async hashData(data: string){
        return argon2.hash(data);
    }

}
