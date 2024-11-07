import { renderSnippet } from '$lib/components/ui/data-table';
import { getGithubURLForProject, getPageURLForProject } from '$lib/utils/index';
import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';

export type Project = {
  label: string; // Label to be displayed
  category: string;
  name: string;
  github: boolean;
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
    }
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
    category: 'other',
    name: 'workout_app',
    github: true,
    hasPage: true,
    notes: 'A mobile app that lets you track your workouts'
  },
  {
    label: 'Website Generator',
    category: 'web',
    name: 'website-generator',
    github: true,
    hasPage: true,
    notes: 'A basic static website generator'
  },
  {
    label: 'Game of Life',
    category: 'web',
    name: 'game-of-life',
    github: true,
    notes: "An implementation of Conway's game of life"
  },
  {
    label: 'MoreTNT',
    category: 'other',
    name: 'MoreTNT',
    github: true,
    notes: 'A minecraft mod that adds variants of TNT'
  },
  {
    label: 'TooManyEntities',
    category: 'other',
    name: 'TooManyEntities',
    github: true,
    notes: 'A minecraft performance mod that hides entities past a certain threshold '
  },
  {
    label: 'TheOdinProject',
    category: 'other',
    name: 'TheOdinProject',
    github: true,
    notes: 'My files for the odin project'
  },
  {
    label: 'Steganographer',
    category: 'cpp',
    name: 'Steganographer',
    github: true,
    notes: 'A command line program to encode messages into images'
  },
  {
    label: 'MarkovSentenceGenerator',
    category: 'cpp',
    name: 'MarkovSentenceGenerator',
    github: true,
    notes:
      'A command line program that generates sentences given a starting word using Markov chains'
  },
  {
    label: 'Minesweeper',
    category: 'web',
    name: 'Minesweeper',
    github: true,
    notes: 'A minesweeper clone written in HTML and JS'
  },
  {
    label: 'ImgToASCII',
    category: 'cpp',
    name: 'ImgToASCII',
    github: true,
    notes: 'A command line program that converts images to ASCII characters'
  },
  {
    label: 'SxhkdRofi',
    category: 'cpp',
    name: 'SxhkdRofi',
    github: true,
    notes: 'A rofi menu for displaying Sxhkd keybindings'
  },
  {
    label: 'PasswordManager',
    category: 'cpp',
    name: 'PasswordManager',
    github: true,
    notes: 'A command line password manager'
  }
];
