import ListItem from "./ListItem";


interface List {
    list:ListItem[],
    load():void,
    save():void,
    clearListItem():void,
    addItem(itemobj:ListItem):void,
    removeItem(id:string) : void
}

export default class FullList implements FullList {
    static instance : FullList = new FullList()
    private constructor(private _list : ListItem[] = []){}

    get list() : ListItem[]{
        return this._list
    }
    load(): void {
        const storedList : string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return
        const parsedList : {_id: string,_item: string,_checked: boolean}[] 
        = JSON.parse(storedList)
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id,itemObj._item,itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }
    save() : void {
        localStorage.setItem("myList",JSON.stringify(this._list))
    }
    clearListItem(){
        this._list = []
        this.save()
    }
    addItem(itemobj : ListItem) : void{
        this._list.push(itemobj)
        this.save()
    }
    removeItem(id : string){
        this._list.filter(item => item.id !== id)
        this.save()
    }
}