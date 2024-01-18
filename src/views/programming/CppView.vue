<script setup lang="ts">
import LinkableHeader from "@/components/LinkableHeader.vue";
import ProjectPreview from "@/components/ProjectPreview.vue";
</script>

<template>
  <div>
    <LinkableHeader><h1>Programming/CPP</h1></LinkableHeader>
    <p>
      I haven't made a major project with C++ yet, but I do have two publicly
      available projects. You can take a look at
      <a href="/programming#projects#sxhkdrofi">SxhkdRofi</a> on the main
      programming page. I also made a simple password manager because I wanted
      to know how they worked.
    </p>
  </div>
  <LinkableHeader><h2>Projects</h2></LinkableHeader>
  <LinkableHeader><h3>PasswordManager</h3></LinkableHeader>
  <ProjectPreview
    project-url="https://github.com/Discusser/PasswordManager"
    :tags="['programming/cpp']"
  >
    <template #preview-content>
      <img src="/media/password_manager.png" alt="Password manager" />
    </template>
    <template #preview-content-text>Preview of the password manager</template>
    <template #description>
      <p>
        A simple command-line password manager I made with C++. Libraries used
        are libsodium and crypto++ for encryption. This password manager is
        intended for learning purposes and not actual use.
      </p>
      <p>
        Master password is encrypted using SHA-256 with crypto++, and passwords
        are encryted using key derivation and authenticated encryption using
        libsodium. An encrypted password, nonce and encrypted password length
        (no padding) is stored within every entry. Given a key (produced from a
        confidential salt, and a confidential hashed master password, both
        stored locally), the password can be freely encrypted and decrypted.
      </p>
    </template>
  </ProjectPreview>
  <LinkableHeader><h3>BookAPI</h3></LinkableHeader>
  <ProjectPreview :tags="['programming/cpp']">
    <template #preview-content>
      <video controls>
        <source src="/media/bookapi.mp4" />
      </video>
    </template>
    <template #preview-content-text> 
      A video demonstrating the features of the application
    </template>
    <template #description>
      <p>
        BookAPI is a GTK app that lets you look up books and see basic
        information on each result. You might notice that I wasn't very inspired
        while making up a name. The actual part of looking up books was not very
        complicated, I did it with
        <a href="https://developers.google.com/books/docs/overview"
          >Google's Book API</a
        >. This project was an opportunity for me to learn about GTK and GLib, libraries which are commonly used on Linux. I also got to learn a lot about build systems in C++, first with CMake, then with Meson, which is more adapted to gnome projects. Unfortunately I don't plan on publishing this application's source code because it's not very well written and also has a few memory leaks, because I dealt with C libraries, which I never bothered fixing.
      </p>
    </template>
  </ProjectPreview>
</template>
