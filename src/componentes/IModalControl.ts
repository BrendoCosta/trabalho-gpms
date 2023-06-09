import { EventHandler } from "./EventHandler";
import { IComponentControl } from "./IComponentControl";
import { TModalProperties } from "./TModalProperties";

export interface IModalControl extends IComponentControl<TModalProperties> {

    Open(): void;
    Close(): void;
    OnOpen: EventHandler<void>;
    OnClose: EventHandler<void>;

}