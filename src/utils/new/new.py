import argparse
import os
import re
import sys
from termcolor import colored

# Constants
GREEN = 'green'
RED = 'red'
WRONG_DIRECTORY = 'This script must be run from the root directory.'
SUBDIRECTORY_DOESNT_EXIST = 'That subdirectory doesn\'t exist.'
COMPONENT_EXISTS = 'That component already exists.'

def handle_exception(e):
    print(colored(e, RED))
    exit(1)


def validate_directory():
    # Check directory
    current_dir = os.path.basename(os.getcwd())
    if current_dir != 'czhangy.io':
        raise Exception(WRONG_DIRECTORY)


def parse_args(args):
    # Define + use parser
    parser = argparse.ArgumentParser(description='Create a new component.')
    parser.add_argument('subdir', metavar='SUBDIRECTORY_NAME', type=str, nargs=1,
                        help='the subdirectory of the component')
    parser.add_argument('component', metavar='COMPONENT_NAME', type=str, nargs=1,
                        help='the subdirectory of the component')
    parser.add_argument('-p', '--props', action='store_true')
    return parser.parse_args(args)


def get_paths(args):
    subdir_path = f'src/components/{args.subdir[0]}'
    component_path = subdir_path + '/' + args.component[0]
    return (subdir_path, component_path)


def validate_args(args):
    # Check for existing paths
    subdir_path, component_path = get_paths(args)
    if not os.path.isdir(subdir_path):
        raise Exception(SUBDIRECTORY_DOESNT_EXIST)
    if os.path.isdir(component_path):
        raise Exception(COMPONENT_EXISTS)


# https://stackoverflow.com/questions/1175208/elegant-python-function-to-convert-camelcase-to-snake-case
def to_kebab_case(component):
    name = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', component)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', name).lower()


def write_to_file(path, content):
    with open(path, 'w') as file:
        file.writelines(content)


def create_tsx(path, component, props):
    kebab_component = to_kebab_case(component)
    file_path = f'{path}/{component}.tsx'
    file_contents = [
        f'import styles from "./{component}.module.scss";\n',
        '\n',
        f'const {component}: React.FC = () => {{\n',
        f'\treturn <div className={{styles["{kebab_component}"]}}></div>;\n',
        f'}};\n',
        '\n',
        f'export default {component};\n'
    ]

    # Handle single-word components
    if '-' not in kebab_component:
        file_contents[3] = f'\treturn <div className={{styles.{kebab_component}}}></div>;\n'

    # Handle props
    if props:
        file_contents[2] = f'const {component}: React.FC<{component}Props> = (props: {component}Props) => {{\n'
        file_contents.insert(1, '\n')
        file_contents.insert(2, f'export type {component}Props = {{\n')
        file_contents.insert(3, '\n')
        file_contents.insert(4, '}')
        file_contents.insert(5, '\n')

    write_to_file(file_path, file_contents)


def create_scss(path, component):
    file_path = f'{path}/{component}.module.scss'
    file_contents = [
        '@use "@/styles/constants";\n',
        '\n',
        f'.{to_kebab_case(component)} {{\n',
        '\n',
        '}\n'
    ]

    write_to_file(file_path, file_contents)


def create_spec(path, component, props):
    file_path = f'{path}/{component}.spec.tsx'
    file_contents = [
        'import "@testing-library/jest-dom";\n',
        '\n',
        'import { render } from "@testing-library/react";\n',
        '\n',
        f'import {component} from "./{component}";\n',
        '\n',
        f'describe("{component}", () => {{\n',
        '\t/**\n',
        '\t * Renders the component\n',
        '\t */\n',
        f'\tconst render{component} = (): void => {{\n',
        f'\t\trender(<{component} />);\n',
        '\t};\n',
        '\n',
        '\tit("Renders correctly", () => {\n',
        f'\t\trender{component}();\n',
        '\t});\n',
        '});\n'
    ]

    if props:
        file_contents[4] = f'import {component}, {{ {component}Props }} from "./{component}";\n'
        file_contents[10] = f'\tconst render{component} = (props: {component}Props): void => {{\n'
        file_contents.insert(9, '\t *\n')
        file_contents.insert(10, f'\t * @param {{{component}Props}} props Props to pass to the component\n')

    write_to_file(file_path, file_contents)


def create_component(args):
    subdir_path, component_path = get_paths(args)

    # Create component folder
    os.makedirs(component_path)

    # Create files
    create_tsx(component_path, args.component[0], args.props)
    create_scss(component_path, args.component[0])
    create_spec(component_path, args.component[0], args.props)

    print(colored(f'{args.component[0]} was created successfully!', GREEN))


def new():
    try:
        validate_directory()
    except Exception as e:
        handle_exception(e)
    
    args = parse_args(sys.argv[1:])

    try:
        validate_args(args)
    except Exception as e:
        handle_exception(e)

    create_component(args)


if __name__ == '__main__':
    new()