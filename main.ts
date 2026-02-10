function CheckObject_Left() {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 120)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 120)
    basic.pause(253)
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(500)
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    Run = 1
    strip.showColor(neopixel.colors(NeoPixelColors.Green))
})
function FixTrack_Right() {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 25)
    basic.pause(190)
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(500)
}

function moveForward_Medium() {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    basic.pause(475)
    maqueen.motorStop(maqueen.Motors.All)
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    Run = 0
})
function CheckObject_Right() {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 120)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 120)
    basic.pause(257)
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(500)
}

function MoveForward_Little() {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 43)
    basic.pause(215)
    maqueen.motorStop(maqueen.Motors.All)
}

function FixTrack_Left() {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 25)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 25)
    basic.pause(200)
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(500)
}

function TrackLine() {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 20)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 21)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 20)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 21)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 40)
    }
    
}

let Run = 0
let strip : neopixel.Strip = null
strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
Run = 0
basic.forever(function on_forever() {
    
    if (Run == 1) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            MoveForward_Little()
            CheckObject_Left()
            if (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
                strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
                CheckObject_Right()
                Run = 2
            } else {
                Run = 3
            }
            
        }
        
    } else if (Run == 2) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            MoveForward_Little()
            CheckObject_Left()
            if (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
                CheckObject_Right()
                Run = 4
            } else {
                Run = 5
            }
            
        }
        
    } else if (Run == 3) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            MoveForward_Little()
            CheckObject_Left()
            FixTrack_Right()
            Run = 6
        }
        
    } else if (Run == 4) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            moveForward_Medium()
            Run = 7
        }
        
    } else if (Run == 5) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            MoveForward_Little()
            CheckObject_Left()
            Run = 7
        }
        
    } else if (Run == 6) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            MoveForward_Little()
            CheckObject_Right()
            Run = 8
        }
        
    } else if (Run == 7) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            moveForward_Medium()
            Run = 6
        }
        
    } else if (Run == 8) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorStop(maqueen.Motors.All)
            if (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
                CheckObject_Left()
                FixTrack_Right()
                Run = 9
            } else {
                Run = 10
            }
            
        }
        
    } else if (Run == 9) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            MoveForward_Little()
            CheckObject_Left()
            Run = 11
        }
        
    } else if (Run == 10) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            moveForward_Medium()
            Run = 11
        }
        
    } else if (Run == 11) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            moveForward_Medium()
            Run = 12
        }
        
    } else if (Run == 12) {
        TrackLine()
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            Run = 0
        }
        
    } else if (Run == 0) {
        maqueen.motorStop(maqueen.Motors.All)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    }
    
})
