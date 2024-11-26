function windSpeed(speed) {
    switch (true) {
        case (speed > 0 && speed < 0.3):
            return 0;
        case (speed > 0.3 && speed < 1.5):
            return 1;
        case (speed > 1.5 && speed < 3.3):
            return 2;
        case (speed > 3.3 && speed < 5.4):
            return 3;
        case (speed > 5.4 && speed < 7.9):
            return 4;
        case (speed > 7.9 && speed < 10.7):
            return 5;
        case (speed > 10.7 && speed < 13.8):
            return 6;
        case (speed > 13.8 && speed < 17.1):
            return 7;
        case (speed > 17.1 && speed < 20.7):
            return 8;
        case (speed > 20.7 && speed < 24.4):
            return 9;
        case (speed > 24.4 && speed < 28.4):
            return 10;
        case (speed > 28.4 && speed < 32.6):
            return 11;
        case (speed > 32.6):
            return 12;

        default:
            return "-";
    }
}

export default windSpeed