function windDirection(windDeg) {
    switch (true) {
        case 360:
            return "N";
        case 90 :
            return "O";
        case 180 :
            return "Z";
        case 270 :
            return "W";
        case (windDeg > 0 && windDeg < 89) :
            return "NO";
        case (windDeg > 91 && windDeg < 179) :
            return "ZO";
        case (windDeg > 181 && windDeg < 269) :
            return "ZW";
        case (windDeg > 271 && windDeg < 359) :
            return "NW";
        case 0 :
        default:
            return "-";
    }
}

export default windDirection