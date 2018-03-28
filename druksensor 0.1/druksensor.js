const int sensorPin = A0;

var value;

function check(){
    value = analogRead(sensorPin);
    Serial.println(value);
    value = map(value, 0, 1023, 0, 255);
}
