import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Contact } from "../../contact/entities/contact.entity";

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

    @Prop({ type: mongoose.Schema.Types.ObjectId , ref: 'Contact' })
    user: Contact
}

export const PhoneEntrySchema = SchemaFactory.createForClass(PhoneEntry)
