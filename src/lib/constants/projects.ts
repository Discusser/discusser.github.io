import { renderSnippet } from '$lib/components/ui/data-table';
import { getGithubURLForProject, getPageURLForProject } from '$lib/utils/index';
import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';

export enum Category {
  Cpp = 'cpp',
  Web = 'web',
  Python = 'python',
  Other = 'other'
}

export type Project = {
  label: string; // Label to be displayed
  category: Category;
  name: string;
  hasGithub?: boolean;
  notes?: string;
  hasPage?: boolean;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'label',
    cell: (ctx) => {
      const snippet = createRawSnippet<[{ url: string | null; label: string | null }]>((props) => {
        const { url, label } = props();
        return {
          render: () =>
            url
              ? `<a class="text-blue-500" href=${url}>${label}</a>`
              : `<span>${label ?? ''}</span>`
        };
      });
      return renderSnippet(snippet, {
        url: getPageURLForProject(ctx.row.original),
        label: ctx.row.original.label
      });
    },
    header: 'Name'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorFn: (project) => getGithubURLForProject(project) ?? '',
    cell: (ctx) => {
      const snippet = createRawSnippet<[string | null]>((getUrl) => {
        const url = getUrl();
        return {
          render: () => (url ? `<a class="text-blue-500" href=${url}>${url}</a>` : '<span></span>')
        };
      });
      return renderSnippet(snippet, getGithubURLForProject(ctx.row.original));
    },
    header: 'GitHub'
  },
  {
    accessorKey: 'notes',
    header: 'Notes'
  }
];

export const projects: Project[] = [
  {
    label: 'Workout Tracker',
    category: Category.Other,
    name: 'workout_app',
    hasGithub: true,
    hasPage: true,
    notes: 'A mobile app that lets you track your workouts'
  },
  {
    label: 'Website Generator',
    category: Category.Web,
    name: 'website-generator',
    hasGithub: true,
    hasPage: true,
    notes: 'A basic static website generator'
  },
  {
    label: 'Game of Life',
    category: Category.Web,
    name: 'game-of-life',
    hasGithub: true,
    notes: "An implementation of Conway's game of life"
  },
  {
    label: 'MoreTNT',
    category: Category.Other,
    name: 'MoreTNT',
    hasGithub: true,
    notes: 'A minecraft mod that adds variants of TNT'
  },
  {
    label: 'TooManyEntities',
    category: Category.Other,
    name: 'TooManyEntities',
    hasGithub: true,
    notes: 'A minecraft performance mod that hides entities past a certain threshold '
  },
  {
    label: 'TheOdinProject',
    category: Category.Other,
    name: 'TheOdinProject',
    hasGithub: true,
    notes: 'My files for the odin project'
  },
  {
    label: 'Steganographer',
    category: Category.Cpp,
    name: 'Steganographer',
    hasGithub: true,
    notes: 'A command line program to encode messages into images'
  },
  {
    label: 'MarkovSentenceGenerator',
    category: Category.Cpp,
    name: 'MarkovSentenceGenerator',
    hasGithub: true,
    notes:
      'A command line program that generates sentences given a starting word using Markov chains'
  },
  {
    label: 'Minesweeper',
    category: Category.Web,
    name: 'Minesweeper',
    hasGithub: true,
    notes: 'A minesweeper clone written in HTML and JS'
  },
  {
    label: 'ImgToASCII',
    category: Category.Cpp,
    name: 'ImgToASCII',
    hasGithub: true,
    notes: 'A command line program that converts images to ASCII characters'
  },
  {
    label: 'SxhkdRofi',
    category: Category.Cpp,
    name: 'SxhkdRofi',
    hasGithub: true,
    notes: 'A rofi menu for displaying Sxhkd keybindings'
  },
  {
    label: 'PasswordManager',
    category: Category.Cpp,
    name: 'PasswordManager',
    hasGithub: true,
    notes: 'A command line password manager'
  },
  {
    label: 'Bouncing Squares',
    category: Category.Python,
    name: 'bouncing-squares',
    hasPage: true,
    notes: 'A calculator program in which colored moving squares bounce around'
  },
  {
    label: 'Draw 3D',
    category: Category.Python,
    name: 'draw-3d',
    hasPage: true,
    notes: 'A basic 3D renderer for my calculator'
  },
  {
    label: 'Draw 2D',
    category: Category.Python,
    name: 'draw-2d',
    hasPage: true,
    notes: 'A basic 2D drawing tool for my calculator'
  },
  {
    label: 'Flappy Bird',
    category: Category.Python,
    name: 'flappy-bird',
    hasPage: true,
    notes: 'A clone of Flappy Bird for my calculator'
  }
];
