import { useEffect, useState, useRef } from "react"

type Item = {
    name: string,
    sellIn: number,
    quality: number,
    id: number
    sellInOrg: number
}
const createItem = (name: string, sellIn: number, quality: number, id: number): Item => ({ name, sellIn, quality, id, sellInOrg: sellIn })

const invitory: Item[] = [
    createItem("+Dex Vest", 10, 20, 1),
    createItem("+5 Dexterity Vest", 10, 20, 2),
    createItem("Aged Brie", 2, 0, 3),
    createItem("Elixir of the Mongoose", 5, 7, 4),
    createItem("Sulfuras, Hand of Ragnaros", 0, 80, 5),
    createItem("Backstage passes to a TAFKAL80ETC concert", 15, 20, 6),
    // Your Task Is to implement conjured
    // A conjured item should decrease its quality by 2 and sellin by 1 for each day passed
    // A conjured item should decrease its quality by 4 for each day after sellin is 0
    // A conjured items quality should never be below 0
    //createItem("Conjured Mana Cake", 3, 6, 7),
]

export const GuildedRose: React.FC = () => {
    const [items, setItems] = useState<Item[]>(invitory)
    const intervalRel = useRef<number | null>(null)

    useEffect(() => {
        if (intervalRel.current === null) {
            const interval = setInterval(() => {
                console.log("TICK")
                for (var i = 0; i < items.length; i++) {
                    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (items[i].quality > 0) {
                            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                items[i].quality = items[i].quality - 1
                            }
                        }
                    } else {
                        if (items[i].quality < 50) {
                            items[i].quality = items[i].quality + 1
                            if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                                if (items[i].sellIn < 11) {
                                    if (items[i].quality < 50) {
                                        items[i].quality = items[i].quality + 1
                                    }
                                }
                                if (items[i].sellIn < 6) {
                                    if (items[i].quality < 50) {
                                        items[i].quality = items[i].quality + 1
                                    }
                                }
                            }
                        }
                    }
                    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        items[i].sellIn = items[i].sellIn - 1;
                    }
                    if (items[i].sellIn < 0) {
                        if (items[i].name != 'Aged Brie') {
                            if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                                if (items[i].quality > 0) {
                                    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                        items[i].quality = items[i].quality - 1
                                    }
                                }
                            } else {
                                items[i].quality = items[i].quality - items[i].quality
                            }
                        } else {
                            if (items[i].quality < 50) {
                                items[i].quality = items[i].quality + 1
                            }
                        }
                    }
                }
                setItems([...items])
            }, 1000)
            intervalRel.current = interval
        }
    }, [])

    const breakPoints = ["h-50", "h-45", "h-40", "h-35", "h-30", "h-25", "h-20", "h-15", "h-10", "h-5"]

    const heightCalc = (item: Item): string => {
        if(item.name === 'Sulfuras, Hand of Ragnaros') {
            return breakPoints[0]
        }
        const precent = ((item.sellIn) / item.sellInOrg) * 100
        const index = (100 - precent) / 10
        return index < breakPoints.length ? breakPoints[index] : breakPoints[breakPoints.length - 1]
    }

    return (
        <div className="grid auto-rows grid-cols-3 gap-4">
            {
                items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 h-60 ${index === 3 || index === 6 ? "col-span-2" : ""}`}
                    >
                        {
                            item.name === "+Dex Vest"
                                ? <div className="h50 flex flex-col">
                                    <div className={`${item.quality <= 0 ? "bg-red-400" : "bg-blue-400"} ${heightCalc(item)}`}>
                                        {item.name}
                                    </div>
                                </div>
                                : item.name === "+5 Dexterity Vest"
                                    ? <div className="h50 flex flex-col">
                                        <div className={`${item.quality <= 0 ? "bg-red-400" : "bg-blue-400"} ${heightCalc(item)} `}>
                                            {item.name}
                                        </div>
                                    </div>
                                    : item.name === "Aged Brie"
                                        ? <div className="h50 flex flex-col">
                                            <div className={`${item.quality >= 20 ? "bg-orange-400" : "bg-blue-400"} ${heightCalc(item)}`}>
                                                {item.name}
                                            </div>
                                        </div>
                                        : item.name === "Elixir of the Mongoose"
                                            ? <div className="h50 flex flex-col">
                                                <div className={`${item.quality <= 0 ? "bg-red-400" : "bg-blue-400"} ${heightCalc(item)} `}>
                                                    {item.name}
                                                </div>
                                            </div>
                                            : item.name === "Sulfuras, Hand of Ragnaros"
                                                ? <div className="h50 flex flex-col">
                                                    <div className={`${"bg-orange-400"} ${heightCalc(item)}`}>
                                                        {item.name}
                                                    </div>
                                                </div>
                                                : item.name === "Backstage passes to a TAFKAL80ETC concert"
                                                    ? <div className="h50 flex flex-col">
                                                        <div className={`${item.quality <= 0 ? "bg-red-400" : "bg-blue-400"} ${heightCalc(item)} `}>
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                    : item.name.includes("Conjured")
                                                        ? <div className="h50 flex flex-col">
                                                            <div className={`${item.quality <= 0 ? "bg-red-400" : "bg-blue-400"} ${heightCalc(item)}`}>
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                        : <div className="h50 w-50 flex flex-col">
                                                            <div className={`${item.quality <= 0 ? "bg-red-400" : "bg-blue-400"} ${heightCalc(item)}`}>
                                                                {item.name}
                                                            </div>
                                                        </div>

                        }

                    </div>
                ))
            }

        </div>
    )
}