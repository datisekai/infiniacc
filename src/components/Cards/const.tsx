import { bongtais, skhs } from "../../pages/Account/const"

export const translateMocQuay = (moc_quay: string) => {
    switch (moc_quay) {
        case "0k_5k":
            return "0k - 5k"
        case "5k_10k":
            return "5k - 10k"
        case "10k":
            return "10k"
        default:
            return "--"
    }
}

export const translateBongTai = (bong_tai: string) => {
    const bongtais = bong_tai?.split(',')
    const bongTai = bongtais?.map((item: any) => {
        switch (item) {
            case "1":
                return "Cấp 1"
            case "2":
                return "Cấp 2"
            default:
                return "--"
        }
    })

    return bongTai?.join(", ")
}

export const translateDeTu = (de_tu: string) => {
    switch (de_tu) {
        case "normal":
            return "Đệ thường"
        case "mabu":
            return "Đệ Mabu"
        case "broly":
            return "Đệ Broly"
        default:
            return "--"
    }
}

export const getSelectBongtai = (bong_tai: string[]) => {
    let bong_tai_handle = bong_tai;
    if (typeof bong_tai === 'string') {
        bong_tai_handle = (bong_tai as any)?.split(',')
    }
    if (!bong_tai || bong_tai?.length == 0) return []

    return bong_tai_handle?.map(item => {
        const value = bongtais.find(bongtai => bongtai?.value == item)
        return {
            value: value?.value,
            label: value?.label
        }
    })
}

export const getSelectSkh = (skh: string[]) => {
    let skh_handle = skh
    if (!skh || skh?.length == 0) return []
    if (typeof skh === 'string') {
        skh_handle = (skh as any)?.split(',')
    }
    return skh_handle?.map(item => {
        const value = skhs.find(skh => skh?.value == item)
        return {
            value: value?.value,
            label: value?.label
        }
    })
}