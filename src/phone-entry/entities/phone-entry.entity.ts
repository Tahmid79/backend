import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class PhoneEntry extends Document {
    @Prop()
    name: string;

    @Prop()
    phone: string;

    @Prop()
    email: string;
}

export const PhoneEntrySchema = SchemaFactory.createForClass(PhoneEntry)
