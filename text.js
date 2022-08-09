// File to increase HTML file readability

// document.getElementById("projectNameCPP-p1").innerHTML = "This is the <code>Vector.h</code> file which contains variable and function declarations.";
// document.getElementById("projectNameCPP-code1").innerHTML =
//     "#ifndef VECTOR_H\n" +
//     "#define VECTOR_H\n" +
//     "\n" +
//     "class Vector {\n" +
//     "public:\n" +
//     "\tVector(double posX, double posY);\n" +
//     "\tVector getThis() { return *this; }\n" +
//     "\tdouble setPosX(double newPosX);\n" +
//     "\tdouble setPosY(double newPosY);\n" +
//     "\tdouble getPosX() const;\n" +
//     "\tdouble getPosY() const;\n" +
//     "private:\n" +
//     "\tdouble posX;\n" +
//     "\tdouble posY;\n" +
//     "};\n" +
//     "\n" +
//     "#endif";
// document.getElementById("projectNameCPP-p2").innerHTML = "This is the <code>Vector.cpp</code> file which contains initialized functions (variables are usually initialized " +
//     "through the constructor or through other functions).";
// document.getElementById("projectNameCPP-code2").innerHTML =
//     "#include \"Vector.h\"\n" +
//     "\n" +
//     "Vector::Vector(double posX, double posY): posX(posX), posY(posY) {}\n" +
//     "double Vector::setPosX(double newPosX) { return posX = newPosX; }\n" +
//     "double Vector::setPosY(double newPosY) { return posY = newPosY; }\n" +
//     "double Vector::getPosX() const { return posX; }\n" +
//     "double Vector::getPosY() const { return posY; }";
//
// document.getElementById("backupScriptBash-p1").innerHTML = "This is a script made with bash to automatically backup certain folders to a backup folder and to an external " +
//     "hard drive if it is plugged in.";
// document.getElementById("backupScriptBash-code1").innerHTML =
//     "#!/bin/bash\n" +
//     "\n" +
//     "# Schedule with anacron\n" +
//     "\n" +
//     "home=/home/discusser\n" +
//     "documents=$home/Documents\n" +
//     "backup_location=$documents/Backups\n" +
//     "allBackups=($documents/School $documents/Scripts)\n" +
//     "\n" +
//     "lsusb | grep -q \"Western Digital Technologies, Inc. Elements Portable\"\n" +
//     "if [ $? == 0 ]\n" +
//     "then\n" +
//     "\tfor i in ${allBackups[@]}\n" +
//     "\tdo\n" +
//     "\t\tcp -r $i /media/discusser/External Hard Drive/Backups\n" +
//     "\tdone\n" +
//     "else\n" +
//     "\tfor i in ${allBackups[@]}\n" +
//     "\tdo\n" +
//     "\t\tcp -r $i $backup_location\n" +
//     "\t\tchmod -R 774 $backup_location/$(echo $i | sed \"s/.*\\///\")\n" +
//     "\t\tchown -R discusser:root $backup_location/$(echo $i | sed \"s/.*\\///\")\n" +
//     "\tdone\n" +
//     "fi";
// document.getElementById("backupScriptBash-p2").innerHTML = "First of all, I want to point out a few things. File paths will not be the same for everyone, this is just my " +
//     "version of the script on Debian 11. The following can be personalised: <code>home</code>, <code>documents</code>, <code>backup_location</code>, <code>allBackups</code>, " +
//     "the external hard drive name, the external hard\n drive path, and discusser:root at the <code>chown</code> command (I recommend that you only change discusser to your own " +
//     "username)";
// document.getElementById("backupScriptBash-div1").innerHTML =
//     "<p>1. <u>Optional</u>: if you don't have an external hard drive, you can remove line 11 to 18 and line 25.</p>\n" +
//     "<p>2. Configure file paths so that the script works with your setup (don't forget to change the external hard drive name).</p>\n" +
//     "<p>3. Change discusser:root next to <code>chown</code> to your_username:root (type <code>man chown</code> in your terminal for more information).</p>\n" +
//     "<p>4. Open /etc/anacrontab with a text editor.</p>\n" +
//     "<p>5. Add an entry on a new line, the format is period (how frequently should the job run, in days), delay (how much time should there be between the anacron\n" +
//     "program starting and the job being run, job identifier (a unique name for your job), and command (what command it should run). If you wanted to run your\n" +
//     "command each day, 5 minutes after the anacron program starts (it starts when the computer boots up), the entry would look something like this:\n" +
//     "<code>1 5 backup-script /path/to/script.sh</code></p>\n" +
//     "<p>6. Save the file and exit your text editor.</p>\n" +
//     "<p>If you did everything correctly, your files should be scheduled to backup in a day.</p>\n" +
//     "<p>Note: anacron is made for devices that aren't always turned on, so it counts even when the computer is turned off by comparing current time to whenever you\n" +
//     "turned off the computer.</p>"

// document.getElementById("catPictures-p1").innerHTML = "meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow " +
//     "meow meow meow";