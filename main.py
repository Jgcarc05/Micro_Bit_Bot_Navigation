def CheckObject_Left():
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 120)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 120)
    basic.pause(253)
    maqueen.motor_stop(maqueen.Motors.ALL)
    basic.pause(500)

def on_button_pressed_a():
    global Run
    Run = 1
    strip.show_color(neopixel.colors(NeoPixelColors.GREEN))
input.on_button_pressed(Button.A, on_button_pressed_a)

def FixTrack_Right():
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 25)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 25)
    basic.pause(190)
    maqueen.motor_stop(maqueen.Motors.ALL)
    basic.pause(500)
def moveForward_Medium():
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 50)
    basic.pause(475)
    maqueen.motor_stop(maqueen.Motors.ALL)

def on_button_pressed_b():
    global Run
    Run = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def CheckObject_Right():
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 120)
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 120)
    basic.pause(257)
    maqueen.motor_stop(maqueen.Motors.ALL)
    basic.pause(500)
def MoveForward_Little():
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 43)
    basic.pause(215)
    maqueen.motor_stop(maqueen.Motors.ALL)
def FixTrack_Left():
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 25)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 25)
    basic.pause(200)
    maqueen.motor_stop(maqueen.Motors.ALL)
    basic.pause(500)
def TrackLine():
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 20)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 21)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0:
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 20)
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 21)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 40)
Run = 0
strip: neopixel.Strip = None
strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
Run = 0

def on_forever():
    global Run
    if Run == 1:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            MoveForward_Little()
            CheckObject_Left()
            if maqueen.ultrasonic(PingUnit.CENTIMETERS) < 15:
                strip.show_color(neopixel.colors(NeoPixelColors.YELLOW))
                CheckObject_Right()
                Run = 2
            else:
                Run = 3
    elif Run == 2:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            MoveForward_Little()
            CheckObject_Left()
            if maqueen.ultrasonic(PingUnit.CENTIMETERS) < 15:
                CheckObject_Right()
                Run = 4
            else:
                Run = 5
    elif Run == 3:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            MoveForward_Little()
            CheckObject_Left()
            FixTrack_Right()
            Run = 6
    elif Run == 4:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            moveForward_Medium()
            Run = 7
    elif Run == 5:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            MoveForward_Little()
            CheckObject_Left()
            Run = 7
    elif Run == 6:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            MoveForward_Little()
            CheckObject_Right()
            Run = 8
    elif Run == 7:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            moveForward_Medium()
            Run = 6
    elif Run == 8:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            maqueen.motor_stop(maqueen.Motors.ALL)
            if maqueen.ultrasonic(PingUnit.CENTIMETERS) < 15:
                CheckObject_Left()
                FixTrack_Right()
                Run = 9
            else:
                Run = 10
    elif Run == 9:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            MoveForward_Little()
            CheckObject_Left()
            Run = 11
    elif Run == 10:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            moveForward_Medium()
            Run = 11
    elif Run == 11:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            moveForward_Medium()
            Run = 12
    elif Run == 12:
        TrackLine()
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            Run = 0
    elif Run == 0:
        maqueen.motor_stop(maqueen.Motors.ALL)
        strip.show_color(neopixel.colors(NeoPixelColors.RED))
basic.forever(on_forever)
