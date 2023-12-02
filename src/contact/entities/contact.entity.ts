import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class Contact extends Document {
    @Prop()
    name: string;

    @Prop()
    phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact)
