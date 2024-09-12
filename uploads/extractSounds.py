import os
import re
import shutil


def main():
    try:
        version: str = input("What version do you want to extract sounds from? (1.7.10, 1.8, 1.9, 1.10, 1.11, 1.12, "
                             "1.13.1, 1.14, 1.15, 1.16, 1.17, 1.18, 1.19) ")
        version = re.match(r'\d.\d*', version)[0]
        if version == "1.7":
            version = "1.7.10"
        elif version == "1.13":
            version = "1.13.1"
        assets: str = open("assets/indexes/" + version + ".json").read()
        cwd = os.getcwd()
        destination = cwd + "/extractedSounds/" + version
        print("Extracting sounds from " + version + " to " + destination)
        os.makedirs(destination)
        for match in re.finditer(r'((?<=sounds/).*?\.ogg).*?((?<=ogg": {"hash": ").*?(?="))', assets):
            file = match.group(1)
            _hash = match.group(2)
            shutil.copyfile(cwd + "/assets/objects/" + _hash[:2] + "/" + _hash, destination + "/" +
                            os.path.basename(file))
        print("Finished extracting sounds")
        input()
    except FileNotFoundError:
        print("Version not found! Try again")
        main()


if __name__ == '__main__':
    main()